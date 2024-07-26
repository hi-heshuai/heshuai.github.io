import React, { useState } from "react";
import { Input } from "@h-form/h-antd";
import { FormR, FieldR, ObjectR, ListR, fieldCtx, useField } from "@h-form/h-react";

export default () => {
  const [value, setValue] = useState("");
  const field = useField(fieldCtx);

  return (
    <div>
      {field.fields.map((property) => {
        return <FieldR key={property} name={property} componentType={Input} />;
      })}
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={() => field.addProperty(value)}>add</button>
    </div>
  );
};
