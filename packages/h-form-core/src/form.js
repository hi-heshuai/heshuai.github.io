import {
  observer,
  getValueByProxy,
  updateValueByProxy,
  getProxyByTarget,
} from "@h-form/h-reactive";
import _ from "lodash";
import { Field } from "./field";
import { Object } from "./object";
import { List } from "./list";

export class Form {
  __type = "form";
  fields = new Set();
  value = {};

  constructor(props) {
    this.defaultValue = props.defaultValue;
    this.init(props);
  }

  init = () => {
    this.makeObservable();
  };

  getValue = () => {
    return this.value;
  };

  get values() {
    return getValueByProxy(this.value);
  }

  set values(value) {
    updateValueByProxy(this.value, value);
  }

  makeObservable = () => {
    this.value = observer(this.value);
  };

  setValuesIn = (path, value, target) => {
    if (value?.target) {
      value = value.target.value;
    }

    if (!["list", "object"].includes(target.__type)) {
      target.value = value;
    }

    _.set(this.value, path, value);
  };

  createField = (props) => {
    const field = new Field({ ...props, form: this });
    this.fields.add(field);
    return field;
  };

  createObject = (props) => {
    const field = new Object({ ...props, form: this });
    this.fields.add(field);
    return field;
  };

  createList = (props) => {
    const field = new List({ ...props, form: this });
    this.fields.add(field);
    return field;
  };

  reset = () => {
    this.fields.forEach((field) => {
      field.reset();
    });
  };

  setValues = (values) => {
    this.fields.forEach((field) => {
      field.setValue(_.get(values, field.path), false);
    });
  };

  setValueByFields = (values, fieldNames = []) => {
    if (!Array.isArray(fieldNames)) {
      throw "请设置需要修改的字段路径";
    }

    const filters = Array.from(this.fields).filter((field) =>
      fieldNames.includes(field.path)
    );

    filters.forEach((field) => {
      field.setValue(_.get(values, field.path), false);
    });
  };

  validate = () => {
    const ps = Array.from(this.fields).map((field) => {
      return field.onValidate();
    });

    return Promise.all(ps).then(() => {
      return this.values;
    });
  };
}
