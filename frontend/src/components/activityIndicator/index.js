import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./index.css";

function ProgressBar() {
  return (
    <div className="progress__bar">
      <CircularProgress color="secondary" />
    </div>
  );
}

export default ProgressBar;
