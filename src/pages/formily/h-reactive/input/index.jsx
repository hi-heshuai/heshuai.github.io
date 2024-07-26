import React from "react";
import { FieldR, useForm } from "@h-form/h-react";
import { Input, Form } from "@h-form/h-antd";
import { Button, Space } from "antd";

import "./index.less";

export default () => {
  const form = useForm();

  const submit = () => {
    form.current.validate().then((val) => {
      console.log(val);
    });
  };

  const reset = () => {
    form.current?.reset();
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
      <Form form={form} labelWidth={80}>
        <FieldR
          name="input1"
          label="输入值"
          componentProps={{ placeholder: "请输入" }}
          componentType={Input}
          required
          rules={[
            {
              rule: /\d+$/,
              message: "请填写数字",
            },
          ]}
        />
      </Form>
    </div>
  );
};
