import React from "react";
import { Switch } from "antd";

export default (props) => {
  return <Switch {...props} checked={props.value} />;
};
