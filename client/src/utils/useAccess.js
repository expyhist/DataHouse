import { useEffect, useState } from 'react';

import { useGetAuthsByIdMutation } from './apisSlice';

export const useAccess = () => {
  const [access, setAccess] = useState({});
  const [getAuthsById] = useGetAuthsByIdMutation();

  useEffect(() => {
    (async () => {
      if (localStorage.getItem('token')) {
        const resp = await getAuthsById();
        setAccess(resp.data.data);
      }
    })();
  }, []);

  return access;
};
