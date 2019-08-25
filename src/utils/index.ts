const isString = (val:any): boolean => typeof val === 'string';

const isNullOrUndef = val => val === null || val === undefined

const zip = (arr1: any[], arr2: any[]) => {
  const config = {
    length: Math.max(arr1.length, arr2.length)
  };
  const pairUp = (_, index) => [arr1[index], arr2[index]];
  return Array.from(config)
              .map(pairUp);
};

const partial = (fn: Function, preset: any[]) => (rest: any[]) => fn(...preset, ...rest);

export { isString, zip, isNullOrUndef, partial };