import React from "react";
import { ObjectR } from "@h-form/h-react";

export const Module = ({ title, name, children }) => {
  return (
    <div className="h-antd-module">
      {title && <h5>{title}</h5>}
      <div>
        <ObjectR name={name}>{children}</ObjectR>
      </div>
    </div>
  );
};
