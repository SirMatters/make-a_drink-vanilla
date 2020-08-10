export const sortObjectsArr = (arr, field) => {
  let sortedArr = [...arr].sort((a, b) => {
    return a[field] < b[field];
  });
  return sortedArr;
};

export const removeNumberedObjectItem = (obj, i) => {
  let copy = { ...obj };
  delete copy[i];
  let values = Object.values(copy);
  const res = {};
  let iter = 1;
  for (let val of values) {
    res[iter] = val;
    iter++;
  }
  return res;
};
