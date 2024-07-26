import React, { useMemo, useContext, useEffect, useState } from "react";
import { useFirstEffect, useForceUpdate } from "../../hooks";
import { autorun } from "@h-form/h-reactive";
import _ from "lodash";

import { formCtx, fieldCtx } from "../../ctx";

export const ObjectR = (props) => {
  const { children } = props;
  const form = useContext(formCtx);
  const parent = useContext(fieldCtx);
  const { path = "" } = parent || {};

  const [forceUpdate, uuid] = useForceUpdate();

  const curPath = path !== "" ? path + "." + props.name : props.name;

  const field = useMemo(() => {
    return form.createObject({
      ...props,
      path: curPath,
      parent: parent || form,
    });
  }, []);

  useFirstEffect(() => {
    autorun(() => {
      field.fields.length;
      forceUpdate();
    });
  });

  return (
    <fieldCtx.Provider value={field}>
      {React.Children.map(children, (child, props) =>
        React.cloneElement(child, { ...props, __uuid: uuid })
      )}
    </fieldCtx.Provider>
  );
};
