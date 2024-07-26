import { observer, getValueByProxy } from "@h-form/h-reactive";
import { guid } from "./utils";
import { batchValidate } from "./validator";
import _ from "lodash";

export class Field {
  __type = "field";
  value = undefined;
  form = null;
  path = undefined;

  constructor(props) {
    this.form = props.form;
    this.parent = props.parent;
    this.path = props.path;
    this.label = props.label;
    this.name = props.name;
    this.value =
      props.defaultValue ||
      props.value ||
      _.get(props.form.defaultValue, props.path);
    this.rules = props.rules;
    this.required = props.required;
    this.validate = {
      validateErrors: [],
      status: "",
      isValidating: false,
    };
    this.____id = guid();

    this.init(props);

    this.setValue(props.value || props.defaultValue || this.value, true);
  }

  init = () => {
    this.validate = observer(this.validate);
  };

  get values() {
    if (this.value instanceof Proxy) {
      return getValueByProxy(this.value);
    }
    return this.value;
  }

  get defaultValue() {
    let curValue = _.get(this.form.defaultValue, this.path);
    if (curValue === null || curValue === undefined) {
      if (this.__type === "field") {
        return "";
      } else if (this.__type === "list") {
        return [];
      } else if (this.__type === "object") {
        return {};
      }
    }

    return curValue;
  }

  get curKey() {
    const path = this.path || "";
    const arr = path.split(".");
    return arr?.[arr.length - 1] || "";
  }

  reset = () => {
    this.setValue(this.defaultValue, true);
  };

  setValue = (value, isInit = false) => {
    if (
      this.parent?.__type === "object" &&
      !this.parent.existProperty(this.curKey)
    ) {
      this.parent.fields.push(this.curKey);
    }

    this.form.setValuesIn(this.path, value, this);

    if (!isInit) {
      //初始化值不做校验
      this.onValidate();
    }
  };

  onValidate = () => {
    return batchValidate(this);
  };
}
