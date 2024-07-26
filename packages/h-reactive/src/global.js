export const ReactionStack = [];
export const RawProxy = new WeakMap();
export const ProxyRaw = new WeakMap();
export const TargetReactionMap = new Map();
export const KeyReactionMap = new Map();

export const Batching = { value: 0 };
export const PendingReactive = new Set();
