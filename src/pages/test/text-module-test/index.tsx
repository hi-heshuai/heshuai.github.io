import React from "react";
import Fr, { useForm } from "form-render";
import { useDynamicsForm } from "../form-render-test/useDynamicsForm";
import { createSchema } from "./config";

const FkDynamicsTextModule: React.FC<{
  type: "qualitative" | "applyMessage"; //类型，是定性还是申诉｜通知模块
  data: Object; //数据源
}> = ({ type, data }) => {
  const form = useForm();

  const info = useDynamicsForm({ isHtml: true, type });
  const schema = createSchema(info);

  if(!info) return <>加载中</>;

  return (
    <Fr
      form={form}
      schema={schema}
      onMount={() => {
        form.setValues(data || {});
      }}
    />
  );
};

export default FkDynamicsTextModule;
