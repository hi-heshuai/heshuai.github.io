import React from "react";
import App from "./pages/app";
import ReactDOM from "react-dom";

const container = document.getElementById("root");

// 使用 createRoot 创建根渲染器
const root = ReactDOM.createRoot(container);

// 使用渲染器的 render 方法来渲染组件
root.render(<App />);
