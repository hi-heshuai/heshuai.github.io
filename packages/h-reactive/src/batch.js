import { Batching, PendingReactive } from "./global";

export const startBatch = () => {
  Batching.value++;
};

export const endBatch = () => {
  Batching.value = 0;
  [...PendingReactive]?.map((reactive) => {
    reactive?.();
  });
};

export const batch = (tracker) => {
  startBatch();
  tracker();
  endBatch();
};

export const isBatching = () => {
  return Batching.value > 0;
};
