import React, { useEffect } from "react";
import { autorun, batch, observable, reaction } from "@formily/reactive";
import _ from 'lodash';

const Reactive = () => {
  useEffect(() => {
    const obs = observable({
      aa: {
        bb: 1234,
        cc: 111,
      },
      b: 1,
      c: []
    });

    reaction(
      () => {
        return obs.aa.bb + obs.aa.cc;
      },
      (value) => {
        console.log("value", value);
      }
    );

    // autorun(() => {
    //   if (false) {
    //     console.log('xxx', obs.aa.bb);
    //   }
    //   console.log('auto run')
    // });

    autorun(() => {
      console.log(obs)
      console.log('ddd', obs.d)
    })

    // batch(() => {

    // });

    // obs.aa.bb = 1;
    // obs.aa.bb = 2;
    // obs.aa.bb = 3;
    // obs.aa.bb = 4;
    // obs.aa.cc = 2;
    obs.c = [1]
    obs.c = [1]
    obs.c = [1]
    obs.c = [1,2]
    _.set(obs, 'd.d.d', 2)

    console.log(obs)

    // const dispose = autorun(() => {
    //   console.log(obs.aa.bb);
    // });

    // setInterval(() => {
    //   obs.aa.bb ++;

    //   dispose();
    // }, 1000);
  }, []);
  return <>reactive</>;
};

export default Reactive;
