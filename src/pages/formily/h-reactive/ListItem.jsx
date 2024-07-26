import { Input } from "@h-form/h-antd";
import React from "react";
import { FieldR, ObjectR, useField } from "@h-form/h-react";

export const ListItem = () => {
  const field = useField();

  return (
    <div>
      {field.value?.map((item, index) => {
        return (
          <div>
            <ObjectR key={index} name={index}>
              <FieldR name="id" value={item.id} componentType={Input} />
              <FieldR name="name" value={item.name} componentType={Input} />
            </ObjectR>
            <button
              onClick={() => {
                field.remove(index);
              }}
            >
              --
            </button>
          </div>
        );
      })}
      <button onClick={() => field.push({ id: "1212", name: "贺帅" })}>
        ++
      </button>
    </div>
  );
};
