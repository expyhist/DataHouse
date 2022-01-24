import { useEffect, useState } from 'react';

import { useGetRolesByNameMutation } from './apisSlice';

export const useAccess = () => {
  const [access, setAccess] = useState({});
  const [getRolesByName] = useGetRolesByNameMutation();
  const token = localStorage.getItem('token');
  const rolesName = localStorage.getItem('rolesName')?.split(',');

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

  useEffect(() => {
    const getRoles = async () => {
      const result = {};
      if (token && rolesName) {
        const resp = await getRolesByName({ name: rolesName });
        const auths = resp.data.data.map((item) => item.auth);
        const authsArray = auths.reduce((acc, cur) => {
          const arr = [];
          cur.forEach((item) => psuhObjToArray(item, arr));
          return acc.concat(arr);
        }, []);
        authsArray.forEach((item) => result[item] = true);
      }
      return result;
    };
    getRoles().then((result) => setAccess(result));
  }, []);
  return access;
};
