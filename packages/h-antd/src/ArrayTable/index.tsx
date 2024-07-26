import React, { useContext, useRef, useState, useEffect } from "react";
import { Table, Button, Space } from "antd";
import { ListR, ObjectR, FieldR, useForceUpdate } from "@h-form/h-react";
import { useField } from "@h-form/h-react";
import { FormItem } from "../createFormItem";
import { antdFormCtx } from "../ctx";
import { autorun, observer } from "@h-form/h-reactive";

const TableForm = (props) => {
  const { children, btnOptions, actionWidth = 120 } = props;

  const { add = {}, del = {}, moveUp = {}, moveDown = {}, selfGroupBtn = [] } =
    btnOptions || {};

  const field = useField();

  const child = React.Children.toArray(children);
  let columns = child.map((item) => {
    const curProps = item.props;
    const { tableProps = {} } = curProps;
    return {
      title: curProps.label,
      dataIndex: curProps.name,
      ...tableProps.columns,
      render: (value) => {
        return (
          <FieldR
            {...curProps}
            hiddenLabel
            formItemProps={{ ...curProps?.formItemProps, hiddenLabel: true }}
            defaultValue={value}
          />
        );
      },
    };
  });

  columns.push({
    title: "操作",
    width: actionWidth,
    render: (_, record, index) => {
      return (
        <Space>
          {!del?.hidden && (
            <a {...del} type="link" onClick={() => field.remove(index)}>
              删除
            </a>
          )}
          {!moveUp?.hidden && (
            <a
              {...moveUp}
              type="link"
              onClick={() => field.move(index, index - 1)}
            >
              上移
            </a>
          )}
          {!moveDown?.hidden && (
            <a
              {...moveDown}
              type="link"
              onClick={() => field.move(index, index + 1)}
            >
              下移
            </a>
          )}
          {selfGroupBtn?.map((Btn, index) => (
            <Btn
              key={index}
              getRecord={() => {
                return { ...field.value?.[index], __index: index };
              }}
            />
          ))}
        </Space>
      );
    },
  });

  const dataSource = (field.value || []).map((item, index) => {
    return { ...item, __index: index };
  });

  return (
    <>
      <Table
        rowKey="__index"
        columns={columns}
        dataSource={dataSource}
        locale={{
          emptyText: <center>请新增数据项</center>,
        }}
        components={{
          body: {
            row: function (props) {
              const indexKey = props["data-row-key"];
              let RowWrapper: any = ObjectR;
              if (indexKey === void 0) {
                RowWrapper = ({ children }) => children;
              }
              return (
                <tr key={indexKey}>
                  <RowWrapper name={indexKey}>{props?.children}</RowWrapper>
                </tr>
              );
            },
          },
        }}
        pagination={false}
      />
      {!add.hidden && (
        <Button
          {...add}
          type={add.type || "default"}
          onClick={() => field.push()}
        >
          {add.text || "新增一条数据"}
        </Button>
      )}
    </>
  );
};

const ArrayTableWrapper = (props) => {
  const { name, label, hiddenLabel, rules, ...restProps } = props;
  const fieldRef = useRef();
  const antdFormContextProps = useContext(antdFormCtx);

  return (
    <FormItem
      label={label}
      required={props?.required}
      hiddenLabel={hiddenLabel}
      {...antdFormContextProps}
      field={fieldRef}
    >
      <div className="h-antd-array-table">
        <ListR rules={rules} name={name} fieldRef={fieldRef}>
          <TableForm {...restProps} />
        </ListR>
      </div>
    </FormItem>
  );
};

export const ArrayTable = ArrayTableWrapper;
