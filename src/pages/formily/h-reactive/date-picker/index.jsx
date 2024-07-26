import React, { useState } from "react";
import { FieldR, useForm } from "@h-form/h-react";
import { DatePicker, Form } from "@h-form/h-antd";
import { Button, Space } from "antd";
import moment from "moment";

import "./index.less";

export default () => {
  const [showText, setShowText] = useState();
  const form = useForm();

  const submit = () => {
    form.current.validate().then((val) => {
      val.datePicker = moment(val.datePicker).format("yyyy-MM-DD hh:mm:ss");
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
      <Form form={form} labelWidth={80}>
        <FieldR
          name="datePicker"
          label="日期选择"
          componentType={DatePicker}
          required
        />
      </Form>
      <div>{showText}</div>
    </div>
  );
};
