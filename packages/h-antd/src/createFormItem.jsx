import React, { useContext, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { antdFormCtx } from "./ctx";
import { autorun, observer } from "@h-form/h-reactive";
import { useForceUpdate } from "@h-form/h-react";

export const createFormItem = (Item) => {
  return (props) => {
    const { field, label, formItemProps, ...restProps } = props;

    const { hiddenLabel = false } = formItemProps || {};
    const { labelWidth, mode } = useContext(antdFormCtx);
    const { validate = {} } = field || {};

    let finallyProps = { ...restProps };

    return (
      <FormItem
        label={field.label}
        required={props?.required}
        hiddenLabel={hiddenLabel}
        labelWidth={labelWidth}
        mode={mode}
        field={{ current: field }}
      >
        <Item {...finallyProps} />
      </FormItem>
    );
  };
};

export const FormItem = (props) => {
  const { label, hiddenLabel = false, required, children, field } = props;
  const { labelWidth, mode } = useContext(antdFormCtx);
  const { validate = {} } = field?.current || {};
  const [update] = useForceUpdate();

  const validateFail = validate.status === "fail";
  const { isValidating = false } = validate || false;

  const isRequired = required || false;

  useEffect(() => {
    observer(field);
    autorun(() => {
      field.current;
      field.current?.validate?.validateErrors?.length;
      field.current?.validate?.isValidating;
      update();
    });
  }, []);

  return (
    <div
      className={`h-form-item ${validateFail ? "h-form-item-fail" : ""} ${
        mode === "vertical" ? "h-form-item-vertical" : ""
      }`}
    >
      <div className="h-form-item-content">
        {!hiddenLabel && (
          <span className="h-form-item-label" style={{ width: labelWidth }}>
            {isRequired && <span style={{ color: "var(--color-red)" }}>*</span>}
            {label && <label>{label}：</label>}
          </span>
        )}
        <div className="h-form-item-value">
          {children}
          {isValidating && (
            <div className="h-form-item-validate">
              <LoadingOutlined />
            </div>
          )}
          {validateFail && (
            <div className="h-form-item-error">
              {validate.validateErrors[0]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
