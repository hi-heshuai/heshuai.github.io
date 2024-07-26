import React, { useMemo, useContext, forwardRef } from "react";
import { autorun } from "@h-form/h-reactive";
import { useFirstEffect, useForceUpdate } from "../../hooks";

import { formCtx, fieldCtx } from "../../ctx";

import _ from "lodash";

export const Core = (props) => {
  const { children, fieldRef, reRender } = props;
  const form = useContext(formCtx);
  const parent = useContext(fieldCtx);
  const { parentPath = "" } = parent || {};
  const curPath = parentPath ? parentPath + "." + props.name : props.name;
  const [forceUpdate, uuid] = useForceUpdate();

  const field = useMemo(() => {
    return form.createList({ ...props, path: curPath, parent: parent || form });
  }, []);

  useFirstEffect(() => {
    autorun(() => {
      field?.value?.length;
      forceUpdate();
      reRender?.();
    });

    autorun(() => {
      field.validate.validateErrors.length;
      field.validate.isValidating;

      forceUpdate();
      reRender?.();
    });

    fieldRef.current = field;
  });

  return (
    <fieldCtx.Provider value={field}>
      {React.Children.map(children, (child, props) => {
        return React.cloneElement(child, { ...props, __uuid: uuid });
      })}
    </fieldCtx.Provider>
  );
};

export const ListR = forwardRef(Core);
