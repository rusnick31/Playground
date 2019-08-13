const isString = (val:any): boolean => typeof val === 'string';

const zip = (arr1: any[], arr2: any[]) => {
  const config = {
    length: Math.max(arr1.length, arr2.length)
  };
  const pairUp = (_, index) => [arr1[index], arr2[index]];
  return Array.from(config)
              .map(pairUp);
};

export { isString, zip };