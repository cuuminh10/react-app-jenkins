import { isArray as _isArray, groupBy as _groupBy } from 'lodash';
import { useEffect, useRef } from 'react';
import { ADD_SNACK_BAR } from 'src/actions/types';
import { store } from 'src/redux/Store';
import moment from 'moment';

export const getSlot = (name, children) => {
  if (children) {
    if (_isArray(children)) {
      return children.find((item) => item && item.key === name);
    }
    if (children.key === name) {
      return children;
    }
  }
  return null;
};

export const objectToArray = (object) => {
  const arr = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(object)) {
    arr.push({ ...value, key });
  }
  return arr;
};

export const getDifference = (oldObject, newObject) => {
  const resultObject = {};
  let count = 0;
  Object.keys(oldObject).filter((key) => oldObject[key] !== newObject[key]).forEach((key) => {
    resultObject[key] = newObject[key];
    count++;
  });
  return count ? resultObject : null;
};

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const boolToNum = (value) => (value ? 1 : 0);

export const addSnackbar = (type, message) => {
  store.dispatch({ type: ADD_SNACK_BAR, payload: { type, message } });
};

export const formatDateTime = (value) => {
  const tzoffset = new Date().getTimezoneOffset() * 60000; // offset in milliseconds
  const localTime = new Date(value) - tzoffset; // local time in milliseconds
  let localISOTime = value;
  if (localTime) {
    const newLocalTime = new Date(localTime);
    localISOTime = newLocalTime.toISOString().slice(0, -1);
  }
  return localISOTime;
};

export const transformMultiply = (value, rate) => Math.round(value * rate);
export const transformDivide = (value, rate) => value / rate;
export const transformDefault = (value) => value;

export const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const formatDate = (value, format = 'DD/MM/YYYY') => (value ? moment(value).format(format) : null);
export const isChecked = (value) => {
  if (typeof value === 'string') {
    return value === 'true';
  }
  return value;
};

export const formatComments = (data) => {
  const currentDate = moment(new Date()).format('DD/MM/YYYY');
  const list = data.map((item) => {
    let dateFormat = moment(item.createDate).format('DD/MM/YYYY');
    const from = moment(currentDate, 'DD/MM/YYY');
    const to = moment(dateFormat, 'DD/MM/YYY');
    const days = from.diff(to, 'days');
    if (days === 0) {
      dateFormat = 'Hôm nay';
    } else if (days === 1) {
      dateFormat = 'Hôm qua';
    }
    return { ...item, dateFormat };
  });

  const dataGroup = _groupBy(list, 'dateFormat');
  const result = [];
  for (const [key, value] of Object.entries(dataGroup)) {
    const object = { title: key, list: value };
    result.push(object);
  }
  return result;
};
