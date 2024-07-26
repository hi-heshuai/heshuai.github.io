import { batch } from "@h-form/h-reactive";
import { clearArray } from "./utils";

export const batchValidate = (field) => {
  return new Promise((resolve, reject) => {
    const { validate } = field;
    validate.isValidating = true;
    batch(() => {
      validate.status = "";
      clearArray(validate.validateErrors);

      let { rules = [] } = field;
      if (field.required) {
        rules.push({
          rule: (val) => {
            if (val !== undefined && val !== null) return Promise.resolve(true);
            return Promise.resolve(false);
          },
          message: `字段${field?.label || ""}必填`,
        });
      }

      const validatePromiseArr = rules.map((rule) => {
        const promise = new Promise((resolve, reject) => {
          if (rule.rule instanceof Function) {
            rule
              .rule(field.value, field.form.values, {
                $value: field,
                $parent: field.parent,
              })
              .then((isSuccess = true) => {
                if (isSuccess) {
                  resolve();
                } else {
                  reject(rule.message || `字段${field?.label || ""}验证失败`);
                }
              });
          } else if (rule.rule instanceof RegExp) {
            if (rule.rule.test(field.value)) {
              resolve();
            } else {
              reject(rule.message || `字段${field?.label || ""}验证失败`);
            }
          } else {
            throw "验证规则类型异常";
          }
        });

        return promise;
      });

      Promise.all(validatePromiseArr)
        .then(() => {
          resolve();
          field.status = "success";
          clearArray(validate.validateErrors);
        })
        .catch((err) => {
          reject(err);
          validate.status = "fail";
          validate.validateErrors.push(err);
        })
        .finally(() => {
          validate.isValidating = false;
        });
    });
  });
};
