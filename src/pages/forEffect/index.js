import { useEffect } from "react";

// export const useForEffect = (effects, deps = []) => {
//   useEffect(() => {

//   }, deps);
// };



export default () => {
  const a = ["a", "b"];

  a.forEach(() => {
    effect(() => {

    }, [a])
  });

  // useForEffect(() => {
  //   a.forEach(item => {

  //   });
  // }, []);
  return <></>;
};
