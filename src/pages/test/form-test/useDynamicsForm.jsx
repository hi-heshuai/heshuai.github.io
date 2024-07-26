import React from "react";
import { Form, Input } from "antd";
import { useEffect, useState } from "react";

export const useDynamicsForm = () => {
  const [formInfo, setFormInfo] = useState();

  useEffect(() => {
    const info = createFormInfo();
    setFormInfo(info);
  }, []);

  return formInfo;
};

const createFormInfo = () => {
  return (
    <>
      <Form.Item name="test" label="title为1展示下一个表单">
        <Input />
      </Form.Item>
      <Form.Item dependencies={["test"]} noStyle>
        {({getFieldsValue}) => {
          const values = getFieldsValue();
          const type = values.test;
          if (type === "1") {
            return (
              <>
                <Form.Item label="文本内容" name="text" rules={[{validator: () => '验证不通过'}]}>
                  <Input placeholder="请输入文本内容" />
                </Form.Item>
                <Form.Item label="文本颜色" name="textColor">
                  <Input placeholder="请输入文本颜色" />
                </Form.Item>
              </>
            );
          }

          return null;
        }}
      </Form.Item>
      <Form.Item dependencies={["test"]} noStyle>
        {({ getFieldValue }) => {
          const type = getFieldValue("test");
          if (type === "12") {
            return (
              <>
                <Form.Item label="文本内容1" name="text1">
                  <Input placeholder="请输入文本内容" />
                </Form.Item>
                <Form.Item label="文本颜色1" name="textColor1">
                  <Input placeholder="请输入文本颜色" />
                </Form.Item>
              </>
            );
          }

          return null;
        }}
      </Form.Item>
    </>
  );
};
