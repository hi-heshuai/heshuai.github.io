export * from "./ArrayTable";
export * from "./Module";
export * from "./Form";

import { createFormItem } from "./createFormItem";
import {
  Input as AntdInput,
  Select as AntdSelect,
  Radio as AntdRadio,
  Rate as AntdRate,
  Slider as AntdSlider,
  TimePicker as AntdTimePicker,
  DatePicker as AntdDatePicker,
  TreeSelect as AntdTreeSelect,
} from "antd";
import SwitchAntd from './Switch';

const { Password: AntdPassword } = AntdInput;

export const Input = createFormItem(AntdInput);
export const Select = createFormItem(AntdSelect);
export const Radio = createFormItem(AntdRadio.Group);
export const Rate = createFormItem(AntdRate);
export const Slider = createFormItem(AntdSlider);
export const Switch = createFormItem(SwitchAntd);
export const TimePicker = createFormItem(AntdTimePicker);
export const TreeSelect = createFormItem(AntdTreeSelect);
export const Password = createFormItem(AntdPassword);
export const DatePicker = createFormItem(AntdDatePicker);
