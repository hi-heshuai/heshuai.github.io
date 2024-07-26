import { TargetReactionMap, KeyReactionMap, ProxyRaw } from "./global";

export const addRawReactionsMap = ({ target, key, reactive }) => {
  const map = TargetReactionMap.get(target) || new Map();
  const reactions = map.get(key) || [];
  reactions.push(reactive);
  const uniReactions = Array.from(new Set(reactions));
  map.set(key, uniReactions);

  TargetReactionMap.set(target, map);
};

export const getReaction = ({ target, key }) => {
  const map = TargetReactionMap.get(target) || new Map();
  const reactions = map.get(key);

  return reactions || [];
};

export const runReaction = ({ target, key }) => {
  const reactive = getReaction({ target, key });
  reactive?.forEach((r) => {
    r?.();
  });
};

export function isProxy(obj) {
  if (!obj) return false;
  return ProxyRaw.has(obj);
}
