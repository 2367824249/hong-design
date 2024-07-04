export const typeTo = (value:any, type:string) => {
  return Object.prototype.toString.call(value) === type;
};
export const isObject = (value:any) => {
  return typeTo(value, '[object Object]');
};
export const isEmpty = <T extends any>(o:T) => typeof o === 'undefined' || o === null || o === '';