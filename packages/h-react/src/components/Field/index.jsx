import { autorun } from "@h-form/h-reactive";
import React, { useMemo, useContext, useState, useRef } from "react";

import { formCtx, fieldCtx } from "../../ctx";
import { useFirstEffect, useForceUpdate } from "../../hooks";
import _ from "lodash";

export const FieldR = (props) => {
  const { componentType, visibleIf, componentProps } = props;
  const form = useContext(formCtx);
  const parent = useContext(fieldCtx) || {};
  const parentPath = parent.path || "";
  const [visible, setVisible] = useState(true);
  const [forceUpdate, uuid] = useForceUpdate();

  const curPath = parentPath ? parentPath + "." + props.name : props.name;

  const field = useMemo(() => {
    return form.createField({
      ...props,
      path: curPath,
      parent: parent || form,
    });
  }, []);

  const renderComponent = () => {
    return React.createElement(componentType, {
      ...field.componentProps,
      ...componentProps,
      required: props.required,
      field,
      formItemProps: props.formItemProps,
      onChange: (e) => {
        field.setValue?.(e);
        field.componentProps?.onChange?.(e);
      },
      value: field.value,
      defaultValue: field.value,
      __uuid: uuid,
    });
  };

  useFirstEffect(() => {
    autorun(() => {
      const v = visibleIf
        ? visibleIf({ $value: field.values, $parent: parent, $form: form })
        : true;
      setVisible(v);
    });

    autorun(() => {
      field.validate.validateErrors.length;
      field.validate.isValidating;

      forceUpdate();
    });

    autorun(() => {
      _.get(form.value, curPath);
      forceUpdate();
    });
  });

  if (!visible) return null;
  if (!componentType) return props.children;

  return (
    <fieldCtx.Provider value={field}>{renderComponent()}</fieldCtx.Provider>
  );
};
