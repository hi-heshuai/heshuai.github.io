import React, { useMemo, useImperativeHandle, forwardRef } from "react";
import { Form } from "@h-form/h-form-core";

import { formCtx } from "../../ctx";
import { useFirstEffect } from "../../hooks";

const FormCore = (props, ref) => {
  const form = useMemo(
    () => new Form({ defaultValue: props?.defaultValue || {} }),
    []
  );

  useImperativeHandle(ref, () => {
    return {
      form,
    };
  });

  useFirstEffect(() => {
    if (props.form) {
      props.form.current = form;
    }
  });

  return <formCtx.Provider value={form}>{props?.children}</formCtx.Provider>;
};

export const FormR = forwardRef(FormCore);
