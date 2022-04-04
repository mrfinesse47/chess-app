import { camelCase } from "change-case";

//doesn't deeply copy, only intended to change keys from a db table to camelcase

export function camelCaseObj(obj: Object): Object {
  const resultingObj = {};
  for (const key in obj) {
    resultingObj[camelCase(key)] = obj[key];
  }

  return resultingObj;
}
