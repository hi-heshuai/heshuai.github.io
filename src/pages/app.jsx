import React, { useState } from "react";

import Login from "./formily/h-reactive/login";
import SetValue from "./formily/h-reactive/set-value";
import Input from "./formily/h-reactive/input";
import Password from "./formily/h-reactive/password";
import Select from "./formily/h-reactive/select";
import Radio from "./formily/h-reactive/radio";
import Slider from "./formily/h-reactive/slider";
import Switch from "./formily/h-reactive/switch";
import TimePicker from "./formily/h-reactive/time-picker";
import DatePicker from "./formily/h-reactive/date-picker";
import Rate from "./formily/h-reactive/rate";
import ArrayTable from "./formily/h-reactive/array-table";

import FormTest from "./test/form-test";
import FormRenderTest from "./test/form-render-test";

import ContextTest from './context';

import "../../packages/h-antd/src/h-antd.less";
import "./index.less";

// const menus = [
//   { code: 1, text: "登录", component: Login },
//   { code: 2, text: "设置值", component: SetValue },
//   { code: 3, text: "Input", component: Input },
//   { code: 4, text: "Password", component: Password },
//   { code: 5, text: "Select", component: Select },
//   { code: 6, text: "Radio", component: Radio },
//   { code: 7, text: "Slider", component: Slider },
//   { code: 8, text: "Switch", component: Switch },
//   { code: 9, text: "TimePicker", component: TimePicker },
//   { code: 10, text: "DatePicker", component: DatePicker },
//   { code: 11, text: "Rate", component: Rate },
//   { code: 12, text: "ArrayTable", component: ArrayTable },
// ];

// export default () => {
//   const [curMenu, setCurMenu] = useState(menus[11]);

//   return (
//     <div style={{ display: "flex" }}>
//       <div style={{ width: 100 }}>
//         {menus.map((menu) => (
//           <div key={menu.code}>
//             <a
//               className={curMenu.code === menu.code ? "selected" : ""}
//               onClick={() => setCurMenu(menu)}
//             >
//               {menu.text}
//             </a>
//           </div>
//         ))}
//       </div>
//       <div style={{ flex: 1 }}>
//         <curMenu.component />
//       </div>
//     </div>
//   );
// };

export default () => {
  return <ContextTest />
}

// export default () => {
//   return <FormRenderTest />;
// };
