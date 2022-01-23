import React from 'react';
import axios from 'axios';

export const AccessContext = React.createContext('');

export const useAccess = async () => {
  const access = {};
  const rolesName = localStorage.getItem('rolesName')?.split(',');
  const token = localStorage.getItem('token');
  if (token && rolesName) {
    const resp = await axios({
      method: 'post',
      url: 'http://localhost:3000/api/rolesbyname',
      data: {
        name: rolesName,
      },
      headers: {
        'x-access-token': token,
      },
    });
    const auths = resp.data.data.map((item) => item.auth);
    auths.forEach((auth) => {
      if (auth.length !== 0) {
        auth.forEach((item) => {
          if (item instanceof Object) {
            Object.entries(item).forEach(([key, value]) => {
              access[key] = true;
              if (value.length !== 0) {
                value.forEach((val) => {
                  access[val] = true;
                });
              }
            });
          }
        });
      }
    });
  }
  return access;
};
