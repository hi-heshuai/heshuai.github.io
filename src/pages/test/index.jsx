import React, { useState } from "react";

const Test = () => {
  const [count, setCount] = useState(1);

  console.log("render count", count);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(1)}>设置为1</button>
      <button onClick={() => setCount(count + 1)}>加1</button>
    </div>
  );
};

class Test1 extends React.Component {
  state = {
    count: 1,
  };

  setOne = () => {
    this.setState({ count: 1 });
  };

  add = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    console.log("class render count", this.state.count);
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={() => this.setOne()}>设置为1</button>
        <button onClick={() => this.add()}>加1</button>
      </div>
    );
  }
}

export default () => {
  return (
    <div>
      <Test></Test>
      <Test1></Test1>
    </div>
  );
};
