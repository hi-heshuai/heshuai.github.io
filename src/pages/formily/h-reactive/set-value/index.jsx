import React, { useEffect } from "react";
import { FieldR, useForm } from "@h-form/h-react";
import { Input, Form, Password } from "@h-form/h-antd";
import { Button, Space, message } from "antd";

import "./index.less";

export default () => {
  const form = useForm();

  const setValue = () => {
    form.current.setValueByFields({ input2: form.current.values.input1 }, [
      "input2",
    ]);
  };

  const setFormValue = () => {
    form.current.setValues({
      input2: form.current.values.input1,
      input1: "我是手动设置的",
    });
  };

  const reset = () => {
    form.current?.reset();
  };

  return (
    <div className="form-wrapper">
      <div className="form-wrapper-options">
        <Space>
          <Button onClick={setValue} type="primary">
            设置特定值
          </Button>
          <Button onClick={setFormValue} type="primary">
            设置表单值
          </Button>
          <Button onClick={reset}>重置</Button>
        </Space>
      </div>
      <Form form={form} labelWidth={60}>
        <FieldR
          name="input1"
          label="输入值"
          componentProps={{ placeholder: "请输入" }}
          componentType={Input}
        />

        <FieldR
          name="input2"
          label="同步值"
          componentProps={{
            placeholder: "请输入上面输入框的值，并点击设置",
            disabled: true,
          }}
          componentType={Input}
        />
      </Form>
    </div>
  );
};
