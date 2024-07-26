import { Field } from "./field";
import { observer } from "@h-form/h-reactive";
import { runReaction } from "@h-form/h-reactive/src/reactive";

export class List extends Field {
  __type = "list";
  value = [];

  constructor(props) {
    super(props);

    this.value = props.value || props.defaultValue || this.value || [];
    this.makeObservable(this.value);

    this.setValue(this.value, true);
  }

  makeObservable = (value) => {
    this.value = observer(value);
  };

  push = (item) => {
    this.value.push(item);

    runReaction({ target: this.value, key: "length" });
  };

  move = (fromIndex, toIndex) => {
    if (fromIndex < 0 || toIndex < 0) return;
    if (fromIndex >= this.value.length || toIndex >= this.value.length) return;
    if (!Array.isArray(this.value)) return;
    if (fromIndex === toIndex) return;

    const flag = this.value[fromIndex];
    this.value[fromIndex] = this.value[toIndex];
    this.value[toIndex] = flag;

    runReaction({ target: this.value, key: "length" });
  };

  remove = (index) => {
    this.value = this.value || [];
    if (this.value.length <= index) return;
    this.value.splice(index, 1);

    runReaction({ target: this.value, key: "length" });
  };
}
