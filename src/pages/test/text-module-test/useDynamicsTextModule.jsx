import React from "react";
import { Form, Input } from "antd";
import { useEffect, useState } from "react";

export const useDynamicsTextModule = ({ type, data }, deps = []) => {
  const [info, setInfo] = useState();

  useEffect(() => {
    const info = createInfo({ type, data });
    setInfo(info);
  }, deps || []);

  return info;
};

const createInfo = ({ type, data }) => {
  return (
    <>
      <Form.Item name="test" label="title为1展示下一个表单">
        {data?.test}
      </Form.Item>
      <Form.Item dependencies={["test"]} noStyle>
        {({ getFieldsValue }) => {
          const values = getFieldsValue();
          const type = values.test;
          if (type === "1") {
            return (
              <>
                <Form.Item
                  label="文本内容"
                  name="text"
                  rules={[{ validator: () => "验证不通过" }]}
                >
                  {data?.text}
                </Form.Item>
                <Form.Item label="文本颜色" name="textColor">
                  {}
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
