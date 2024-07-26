import React, { useRef, useState } from "react";
import Fr, { useForm } from "form-render";
import { Button } from "antd";

import { useDynamicsForm } from "./useDynamicsForm";
import { createSchema } from "./config";

export default () => {
  const form = useForm();

  const { qualitative, applyMessage } = useDynamicsForm();
  const schema = createSchema({ qualitative, applyMessage });

  return (
    <>
      <Fr
        form={form}
        schema={schema}
        onFinish={(values) => console.log(values)}
      />
      <Button
        onClick={() => {
          form.submit();
        }}
      >
        提交
      </Button>
    </>
  );
};
