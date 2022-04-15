const redis = require("./redis");

// Format Redis Keys
const formatRedisKey = (key, reqParams) => {
  const { name, params } = key;
  let redisKey = name;
  params.map((param) => {
    const paramSplit = param.split(".");
    const mainParam = paramSplit[0];
    const secParam = paramSplit[1];
    const val = !secParam
      ? reqParams[mainParam].toString()
      : reqParams[mainParam][secParam].toString();
    if (!val) return;

    redisKey = redisKey + "_" + param + ":" + val.trim();
  });

  return redisKey.trim().toLowerCase();
};

module.exports = {
  cacheData: async (key, reqParams, data) =>
    await redis.set(formatRedisKey(key, reqParams), JSON.stringify(data), {
      EX: key.expiresIn,
    }),
  checkCacheData: (key) => async (req, res, next) => {
    const redisKey = formatRedisKey(key, {
      animeSource: req.animeSource,
      ...req.params,
      ...req.body,
    });
    const data = await redis.get(redisKey);

    // Checking if Data exists
    if (!data) return next();

    const cachedData = JSON.parse(data);
    res.status(200).json({ ...cachedData });
  },
  removeCacheData: async (key, reqParams) =>
    await redis.del(formatRedisKey(key, reqParams)),
  getCache: async (key, reqParams) =>
    await redis.get(formatRedisKey(key, reqParams)),
};
