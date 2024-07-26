import React, { useState } from "react";
import { FieldR, useForm } from "@h-form/h-react";
import { Password, Form } from "@h-form/h-antd";
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
    setShowText('')
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
          name="password"
          label="密码"
          componentProps={{ placeholder: "请输入" }}
          componentType={Password}
          required
        />
        <FieldR
          name="rePassword"
          label="确认密码"
          componentProps={{ placeholder: "请输入" }}
          componentType={Password}
          required
          rules={[
            {
              rule: (val, formData) => {
                if (val === formData.password) return Promise.resolve(true);
                return Promise.resolve(false);
              },
              message: "输入密码不一致",
            },
          ]}
        />
      </Form>
      <div>{showText}</div>
    </div>
  );
};
