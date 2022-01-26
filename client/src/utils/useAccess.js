import { useEffect, useState } from 'react';

import { useGetRolesByNameMutation } from './apisSlice';

const psuhObjToArray = (obj, arr) => {
  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(key)) {
      arr.push(...key);
    } else arr.push(key);
    if (Array.isArray(value)) {
      arr.push(...value);
    } else arr.push(value);
  });
  return arr;
};

export const useAccess = () => {
  const [access, setAccess] = useState({});
  const [getRolesByName] = useGetRolesByNameMutation();

  useEffect(() => {
    (async () => {
      const result = {};
      if (localStorage.getItem('token')) {
        const resp = await getRolesByName();
        const auths = resp.data.data.map((item) => item.auth);
        const authsArray = auths.reduce((acc, cur) => {
          const arr = [];
          cur.forEach((item) => psuhObjToArray(item, arr));
          return acc.concat(arr);
        }, []);
        authsArray.forEach((item) => {
          result[item] = true;
          return null;
        });
      }
      setAccess(result);
    })();
  }, []);

  return access;
};
