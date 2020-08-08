export const sortObjectsArr = (arr, field) => {
  let sortedArr = [...arr].sort((a, b) => {
    return a[field] < b[field];
  });
  return sortedArr;
};
