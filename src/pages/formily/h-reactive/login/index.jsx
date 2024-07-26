import React, { useEffect } from "react";
import { FieldR, useForm } from "@h-form/h-react";
import { Input, Form, Password } from "@h-form/h-antd";
import { Button, Space, message } from "antd";

import "./index.less";

export default () => {
  const form = useForm();

  const login = () => {
    form.current.validate().then(({ account, passport }) => {
      if (account === "heshuai" && passport === "123456") {
        return message.success("登录成功");
      }
      return message.success("账号或者密码错误");
    });
  };

  const reset = () => {
    form.current?.reset();
  };

  return (
    <div className="login-form">
      <Form
        form={form}
        labelWidth={60}
        defaultValue={{ account: "heshuai" }}
      >
        <FieldR
          name="account"
          label="账号"
          componentProps={{ placeholder: "请输入账号" }}
          componentType={Input}
          rules={[
            {
              rule: (val) => {
                return new Promise((resolve, reject) => {
                  if (val) {
                    resolve(true);
                  } else resolve(false);
                });
              },
              message: "请输入账号",
            },
          ]}
        />
        <FieldR
          name="passport"
          label="密码"
          componentProps={{ placeholder: "请输入密码" }}
          componentType={Password}
          rules={[
            {
              rule: (val) => {
                return new Promise((resolve, reject) => {
                  if (val) {
                    resolve(true);
                  } else resolve(false);
                });
              },
              message: "请输入密码",
            },
          ]}
        />
      </Form>
      <div className="login-form-footer">
        <Space>
          <Button onClick={login} type="primary">
            登录
          </Button>
          <Button onClick={reset}>重置</Button>
        </Space>
      </div>
    </div>
  );
};
