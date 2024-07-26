import React, { useState } from "react";
import { FieldR, useForm } from "@h-form/h-react";
import { Input, Form, ArrayTable, Select } from "@h-form/h-antd";
import { Button, Space } from "antd";
import ConfigBtn from "./ConfigBtn";

import "./index.less";

export default () => {
  const form = useForm();
  const [showText, setShowText] = useState();

  const submit = () => {
    form.current.validate().then((val) => {
      setShowText(JSON.stringify(val));
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
        <ArrayTable
          name="arr"
          label="表单表格"
          required
          btnOptions={{
            add: { text: "新增", type: "primary" },
            del: { text: "删除", type: "primary" },
            moveUp: { text: "上移动", type: "primary" },
            moveDown: { text: "下移动", type: "primary" },
            selfGroupBtn: [ConfigBtn],
          }}
          actionWidth={400}
          rules={[
            {
              rule: (val, formData) => {
                if (val.length === 0) {
                  return Promise.resolve(false);
                }
                return Promise.resolve(true);
              },
              message: "至少填写一条数据",
            },
          ]}
        >
          <FieldR
            name="name"
            label="姓名"
            componentType={Input}
            componentProps={{ placeholder: "请输入" }}
            defaultValue="贺帅"
            visibleIf={({ $value, $parent }) => {
              return $parent.value.age !== "hidden";
            }}
            rules={[
              {
                rule: (val, formData, { $parent }) => {
                  if ($parent.value.age === "show") {
                    if (val === "贺帅") return Promise.resolve(true);
                    return Promise.resolve(false);
                  }
                  return Promise.resolve(true);
                },
                message: "姓名填写错误",
              },
            ]}
          />
          <FieldR
            name="age"
            label="类型"
            tableProps={{ columns: { width: 200 } }}
            componentType={Select}
            defaultValue="hidden"
            componentProps={{
              options: [
                { label: "显示", value: "show" },
                { label: "隐藏", value: "hidden" },
              ],
            }}
          />
        </ArrayTable>
      </Form>
      <div>{showText}</div>
    </div>
  );
};
