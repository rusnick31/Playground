const isString = (val:any): boolean => typeof val === 'string';

const zip = (arr1, arr2) => {
  const config = {
    length: Math.max(arr1.length, arr2.length)
  };
  const pair = (_, index) => [arr1[index], arr2[index]];
  return Array.from(config)
              .map(pair);
};

export { isString, zip };