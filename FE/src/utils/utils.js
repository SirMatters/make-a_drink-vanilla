import { format } from 'timeago.js';

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

export const timestampToDate = (timestamp) => {
  const date = new Date(timestamp);
  const timeStr = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  return timeStr;
};

export const timestampToHumanString = (timestamp) => {
  return format(timestamp);
};
