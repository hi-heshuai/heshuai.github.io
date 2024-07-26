import React, { useState } from "react";
import { FieldR, useForm } from "../time-picker/node_modules/@h-form/h-react";
import { Slider, Form } from "../time-picker/node_modules/@h-form/h-antd";
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
      <Form form={form} defaultValue={{ slider: 20 }} labelWidth={80}>
        <FieldR
          name="slider"
          label="进度"
          componentType={Slider}
          required
        />
      </Form>
      <div>{showText}</div>
    </div>
  );
};
