import { apisSlice } from './apisSlice';

export const useAccess = () => {
  const endPoints = Object.keys(apisSlice.endpoints);
  const roles = localStorage.getItem('roles')?.split(',');
  const result = {};
  const accessRoles = {};

  roles?.forEach((role) => {
    accessRoles[role] = true;
  });

  endPoints?.forEach((endPoint) => {
    result[endPoint] = accessRoles[endPoint];
  });

  ['/demands', '/tables', '/sysconfigs'].forEach((page) => {
    result[page] = true;
  });

  return result;
};
