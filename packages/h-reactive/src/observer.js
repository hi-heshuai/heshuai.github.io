import {
  RawProxy,
  ReactionStack,
  TargetReactionMap,
  PendingReactive,
  ProxyRaw,
} from "./global";
import { isBatching } from "./batch";
import { getArrayLastElement } from "./utils";
import { addRawReactionsMap, getReaction, isProxy } from "./reactive";

// Proxy = new Proxy(Proxy, {
//   //拦截 new 操作符，生成 Proxy 实例的时候来拦截
//   construct: function (target, argumentsList) {
//     //result是new Proxy()生成的原本的实例
//     const result = new target(...argumentsList);
//     //获取原本实例reslut的类型
//     const originToStringTag = Object.prototype.toString
//       .call(result)
//       .slice(1, -1)
//       .split(" ")[1];
//     //改写result的[Symbol.toStringTag]属性，加上被代理的标志
//     result[Symbol.toStringTag] = "Proxy-" + originToStringTag;
//     return result;
//   },
// });

export const observer = (obj) => {
  if (ProxyRaw.has(obj)) return obj;
  if (RawProxy.has(obj)) return RawProxy.get(obj);

  if (typeof obj !== "object") return obj;

  const proxyTarget = new Proxy(obj, {
    get: (target, key, receiver) => {
      const reactive = getArrayLastElement(ReactionStack);
      if (!reactive) return target[key];
      let mapTarget = target;
      if (target == obj) {
        mapTarget = proxyTarget;
      }

      if (typeof target[key] === "object") {
        target[key] = observer(target[key]);
        return target[key];
      }

      addRawReactionsMap({ target: mapTarget, key, reactive });

      return target[key];
    },
    set: (target, key, value) => {
      let oldValue = target[key];
      let newValue = value;
      if (isProxy(value) && ProxyRaw.has(value)) {
        newValue = ProxyRaw.get(value);
      }

      let mapTarget = target;
      if (target == obj) {
        mapTarget = proxyTarget;
      }

      if (newValue !== undefined && typeof newValue === "object") {
        if (
          !RawProxy.has(newValue) ||
          !Object.prototype.hasOwnProperty(target, key)
        ) {
          newValue = observer(newValue);
        }
      }
      target[key] = newValue;

      // if (oldValue !== newValue) {//todo 需要恢复
      const reactive = getReaction({ target: mapTarget, key });
      if (isBatching()) {
        reactive.forEach((r) => {
          PendingReactive.add(r);
        });
      } else {
        reactive.forEach((r) => {
          r?.();
        });
      }
      // }
      return true;
    },
  });

  RawProxy.set(obj, proxyTarget);
  ProxyRaw.set(proxyTarget, obj);
  return proxyTarget;
};

export const getValueByProxy = (proxy) => {
  const obj = ProxyRaw.get(proxy);
  const newObj = Object.assign({}, obj);

  if (Array.isArray(obj)) {
    let arr = obj.map((item) => {
      if (typeof item === "object" && isProxy(item)) {
        const curObj = getValueByProxy(item);
        return curObj;
      }
      return item;
    });
    return arr;
  } else if (typeof obj === "object") {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "object" && isProxy(obj[key])) {
        const curObj = getValueByProxy(obj[key]);
        newObj[key] = curObj;
      }
    });
  }
  return newObj;
};

export const getProxyByTarget = (raw) => {
  return RawProxy.get(raw);
};

export const updateValueByProxy = (proxy, value) => {
  ProxyRaw.set(proxy, value);
};
