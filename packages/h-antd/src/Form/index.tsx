import React, { forwardRef } from "react";
import { FormR } from "@h-form/h-react";
import { antdFormCtx } from "../ctx";

const BaseForm = ({ children, ...restProps }, ref) => {
  let formBindProps: any = {};
  if (restProps.form) {
    formBindProps.form = restProps.form;
  }
  if (restProps.defaultValue) {
    formBindProps.defaultValue = restProps.defaultValue;
  }
  return (
    <antdFormCtx.Provider value={{ ...restProps }}>
      <FormR {...formBindProps} ref={ref}>
        {children}
      </FormR>
    </antdFormCtx.Provider>
  );
};

export const Form = forwardRef(BaseForm);
