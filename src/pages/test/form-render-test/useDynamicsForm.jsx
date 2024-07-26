import React from "react";
import { Form, Input, Button } from "antd";
import { useEffect, useState } from "react";

export const useDynamicsForm = () => {
  const [formInfo, setFormInfo] = useState({});

  useEffect(() => {
    const info = createFormInfo();
    setFormInfo(info);
  }, []);

  return formInfo;
};

const createFormInfo = () => {
  const qualitative = {
    select: {
      title: "下拉框",
      type: "string",
      widget: "select",
      props: {
        options: [
          { label: "早", value: "1" },
          { label: "中", value: "2" },
          { label: "晚", value: "3" },
        ],
      },
    },
    test: {
      title: "test1",
      type: "string",
      hidden: "{{formData.select!=1}}",
    },
    test2: {
      title: "test2",
      type: "string",
      hidden: '{{formData?.select!=1}}',
    },
  };

  const applyMessage = {
    selectx: {
      title: "是否通知",
      type: "string",
      widget: "select",
      props: {
        options: [
          { label: "早", value: "1" },
          { label: "中", value: "2" },
          { label: "晚", value: "3" },
        ],
      },
    },
    testx1: {
      title: "test1多得多",
      type: "string",
      hidden: "{{formData.selectx!=1}}",
    },
    testx2: {
      title: "test2多得多",
      type: "string",
      hidden: "{{formData.selectx!=2}}",
    },
  };

  return { qualitative, applyMessage };
};
