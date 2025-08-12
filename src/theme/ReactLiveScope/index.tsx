import React from "react";
import * as UtilityWrapper from "utility-wrapper";

// Add react-live imports you need here
const ReactLiveScope: unknown = {
  React,
  UtilityWrapper,
  ...React,
};

export default ReactLiveScope;
