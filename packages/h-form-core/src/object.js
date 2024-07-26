import { Field } from "./field";
import { observer } from "@h-form/h-reactive";
import { runReaction } from "@h-form/h-reactive/src/reactive";

export class Object extends Field {
  __type = "object";
  fields = [];

  constructor(props) {
    super(props);
    this.fields = observer(this.fields);
    const defaultValue = props.value || props.defaultValue || {};
    this.makeObservable(defaultValue);

    this.setValue(defaultValue, true);
  }

  makeObservable = (value) => {
    this.value = observer(value);
  };

  addProperty = (key, value) => {
    if (!this.existProperty(key)) {
      this.fields.push(key);
      const path = this.path + "." + key;
      this.form.setValuesIn(path, value, this );
    }

    runReaction({ target: this.fields, key: "length" });
  };

  existProperty = (key) => {
    return this.fields.includes(key);
  };
}
