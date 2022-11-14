import React, { useState } from "react";

// Icons
import WarningIcon from "@mui/icons-material/Warning";

function AdsWarning() {
  const [showWarning, setShowWarning] = useState(true);

  return (
    <>
      {showWarning && (
        <div className="ads-warning-container center">
          <div className="shadow" onClick={() => setShowWarning(false)}></div>
          <div className="ads-warning-content center-vertical">
            <WarningIcon className="icon" />
            <h1>INAPPROPRIATE ADS WARNING</h1>
            <p>
              Please be aware that there may be inappropriate ads through popups
              and redirects when watching the anime videos. We wished there was
              a way to remove it, but due to the circumstances of obtaining the
              shows, it's sadly not possible.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default AdsWarning;
