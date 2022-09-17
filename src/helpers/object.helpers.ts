import { isObject, isArray, camelCase, reduce } from "lodash";

export const camelCaseKeys = (obj: any): any => {
  if (isObject(obj) && obj instanceof Date) {
    return obj.toISOString();
  }
  if (!isObject(obj)) {
    return obj;
  } else if (isArray(obj)) {
    return obj.map((v) => camelCaseKeys(v));
  }
  return reduce(
    obj,
    (r, v, k) => {
      return {
        ...r,
        [camelCase(k)]: camelCaseKeys(v),
      };
    },
    {}
  );
};
