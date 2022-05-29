import React, { createContext, useContext } from "react";

// MUI
import { useMediaQuery } from "@mui/material";

// Global Context
const GlobalContext = createContext();
export const useGlobal = () => useContext(GlobalContext);

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const isSmallDevice = useMediaQuery("(max-width:767px)", { noSsr: true });

  return (
    <GlobalContext.Provider value={{ isSmallDevice }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
