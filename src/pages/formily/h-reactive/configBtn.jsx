import React from "react";

export const ConfigBtn = ({ getRecord }) => {
  return (
    <a
      onClick={() => {
        console.log("record", getRecord());
      }}
    >
      配置
    </a>
  );
};

export default ConfigBtn;
