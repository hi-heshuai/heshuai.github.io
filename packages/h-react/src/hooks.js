import { useContext, useRef, useState } from "react";

import { fieldCtx, formCtx } from "./ctx";

export const useField = () => {
  const field = useContext(fieldCtx);

  return field;
};

export const useFirstEffect = (callback) => {
  const isRun = useRef(false);
  if (isRun.current === false) {
    callback();
    isRun.current = true;
  }
};

export const useForceUpdate = () => {
  const [state, setState] = useState(0);
  const ref = useRef(state);
  const forceUpdate = () => {
    ref.current++;
    setState(ref.current);
  };

  return [forceUpdate, state];
};

export const useForm = () => {
  const form = useRef();
  return form;
}
