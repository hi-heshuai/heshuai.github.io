import React, { useEffect, useRef } from "react";
import { observer, autorun, batch } from "@h-form/h-reactive";
import { FormR, FieldR, ObjectR, ListR, useForm } from "@h-form/h-react";
import { Input, Form, ArrayTable, Module, Select } from "@h-form/h-antd";
import { ListItem } from "./ListItem";
import { ConfigBtn } from "./configBtn";
import _ from "lodash";
import Objectxx from "./Object";

import "@h-form/h-antd/src/h-antd.less";

export default () => {
  const form = useForm();

  const submit = () => {
    const values = form.current.values;
    const value = form.current.value;
    form.current
      .validate()
      .then((data) => {})
      .catch(() => {});
    console.log("value", { values, value });
  };

  useEffect(() => {
    let obj = observer({
      a: {
        a: 0,
      },
    });

    autorun(() => {
      // console.log({ a: obj.a, b: obj.b, c: obj.c });
      // console.log("obj", obj);
      // debugger;
      // console.log(obj.a.a);
      // obj.a.a
    });
    // _.set(obj, "da", undefined);
    // _.set(obj, "da", {});
    // _.set(obj, "da.aa", undefined);
    // _.set(obj, "da.aa", {});
    // _.set(obj, "da.aa.code2", undefined);
    // _.set(obj, "da.aa.code3", undefined);
    // debugger;
    // console.log("ss", obj);
    // obj.a.a = 1111;
    // obj.a.a = 11111;
    // obj.a.a = 333;
    // obj.a.c = 4;
    // obj.a.b = 1;
    // obj.a.c = 3;
    // obj.a.a = 2;
    // batch(() => {
    //   obj.a.a = 1111;
    //   obj.a.a = 11111;
    //   //   // obj.a.aa++;
    //   //   // obj.a.aa++;
    //   //   // obj.a.aa++;
    //   //   // obj.a.aa++;
    //   //   // obj.c = { a: 1 };
    // });
  }, []);

  return (
    <div>
      <Form labelWidth={80} form={form}>
        <Module title="基本信息" name="baseInfo">
          <FieldR
            name="name"
            label="姓名"
            componentProps={{ placeholder: "1121" }}
            defaultValue="2"
            componentType={Input}
            rules={[
              {
                rule: (val, formData) => {
                  return new Promise((resolve, reject) => {
                    setTimeout(() => {
                      console.log({ val, formData });
                      if (val == "22") {
                        resolve(true);
                      }
                      resolve(false);
                    }, 0);
                  });
                },
                message: "名称必填",
              },
              {
                rule: () => {
                  return new Promise((resolve, reject) => {
                    setTimeout(() => {
                      resolve(true);
                    }, 0);
                  });
                },
                message: "名称必填111",
              },
            ]}
          />
          <FieldR
            name="age"
            label="年龄"
            componentProps={{ placeholder: "1121" }}
            defaultValue="2"
            componentType={Input}
          />
        </Module>
        {/* <FieldR
          name="code2"
          componentProps={{ placeholder: "1121" }}
          defaultValue="2"
          componentType={Input}
        /> */}
        <ArrayTable
          name="arr"
          label={null}
          btnOptions={{
            // add: { text: "新增", type: "primary" },
            del: { text: "删除", type: "primary" },
            moveUp: { text: "上移动", type: "primary" },
            moveDown: { text: "下移动", type: "primary" },
            selfGroupBtn: [ConfigBtn],
          }}
          actionWidth={400}
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
        {/* <ObjectR name="ddd">
          <Objectxx />
        </ObjectR> */}
        {/* <ListR name="arr">
          <ListItem />
        </ListR> */}
        {/* <ObjectR name="da">
          <ObjectR name="aa">
            <FieldR
              name="code2"
              componentProps={{ placeholder: "1121", value: 2 }}
              componentType={Input}
            />
          </ObjectR>
        </ObjectR> */}
      </Form>
      <button onClick={submit}>获取</button>
    </div>
  );
};

const a = {
  da: {},
};
