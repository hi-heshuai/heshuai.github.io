import React, { useRef, useState } from "react";
import { Form, Input, Button } from "antd";

import { useDynamicsForm } from "./useDynamicsForm";

export default () => {
  const [form] = Form.useForm();
  const { qualitative, applyMessage } = useDynamicsForm();

  return (
    <>
      <Form
        ref={form}
        onFinish={(values) => console.log(values)}
        onValuesChange={(_, values) => console.log(values)}
      >
        <Form.Item name="title" label="标题">
          <Input />
        </Form.Item>
        {qualitative}
        <Form.Item name="punishObject" label="处罚对象">
          <Input />
        </Form.Item>
        {applyMessage}
      </Form>
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
