import { ReactionStack } from "./global";

export const autorun = (tracker) => {
  const reactive = () => {
    ReactionStack.push(reactive);
    tracker();
    ReactionStack.pop();
  };

  reactive();

  return () => {
    // ReactionStack = ReactionStack.filter((r) => r !== reactive);
  };
};
