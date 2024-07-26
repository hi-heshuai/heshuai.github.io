import { useEffect, useLayoutEffect, useRef, useState } from "react";

export const createContext = (defaultValue) => {
  const root = defaultValue || {};
  const subs = [];

  const Provider = ({ value, children }) => {
    useFirstEffect(() => {
      Object.keys(value).forEach((key) => {
        root[key] = value[key];
      });

      subs?.forEach((cb) => {
        cb({ ...root });
      });
    }, [value]);

    return children;
  };

  const sub = (cb) => {
    subs.push(cb);
  };

  return { Provider, root, sub };
};

export const useContext = (ctx) => {
  const [value, setValue] = useState(ctx.root);

  useFirstRun(() => {
    ctx.sub((val) => {
      setValue(val);
    });
  });

  return value;
};

const useFirstRun = (run) => {
  const isRunRef = useRef(false);

  if (!isRunRef.current) {
    run?.();
    isRunRef.current = true;
  }
};

const useFirstEffect = (cb, deps = []) => {
  const beforeDepsRef = useRef(JSON.stringify(deps));
  const curDepsStr = JSON.stringify(deps);

  if (beforeDepsRef.current !== curDepsStr) {
    cb?.();
    beforeDepsRef.current = curDepsStr;
  }

  useFirstRun(() => cb());
};
