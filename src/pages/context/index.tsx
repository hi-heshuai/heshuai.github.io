import React, { useState } from "react";
import { ctx } from "./ctx";
import { useContext } from "../../../packages/h-context";

export default () => {
  const [val, setVal] = useState(1);

  return (
    <ctx.Provider value={{ val, setVal }}>
      {val}
      <AddBtn />
    </ctx.Provider>
  );
};

const AddBtn = () => {
  const global = useContext(ctx);
  const { setVal, val } = global;

  console.log("global", global);

  return <button onClick={() => setVal(val + 10)}>+10</button>;
};
