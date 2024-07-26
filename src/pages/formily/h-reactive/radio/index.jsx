import React, { useState } from "react";
import { FieldR, useForm } from "@h-form/h-react";
import { Radio, Form } from "@h-form/h-antd";
import { Button, Space } from "antd";

import "./index.less";

export default () => {
  const [showText, setShowText] = useState();
  const form = useForm();

  const submit = () => {
    form.current.validate().then((val) => {
      setShowText(JSON.stringify(val));
    });
  };

  const reset = () => {
    form.current?.reset();
    setShowText("");
  };

  return (
    <div className="form-wrapper">
      <div className="form-wrapper-options">
        <Space>
          <Button onClick={submit} type="primary">
            提交
          </Button>
          <Button onClick={reset}>重置</Button>
        </Space>
      </div>
      <Form form={form} defaultValue={{ radio: "vue" }} labelWidth={80}>
        <FieldR
          name="radio"
          label="框架"
          componentType={Radio}
          componentProps={{
            placeholder: "请选择",
            options: [
              { label: "vue", value: "vue" },
              { label: "react", value: "react" },
            ],
          }}
          required
        />
      </Form>
      <div>{showText}</div>
    </div>
  );
};
