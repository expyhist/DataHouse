import { useEffect, useState } from 'react';

import { useGetAuthsMutation } from './apisSlice';

export const useAccess = () => {
  const [access, setAccess] = useState({});
  const [getAuths] = useGetAuthsMutation();

  useEffect(() => {
    (async () => {
      if (localStorage.getItem('token')) {
        const resp = await getAuths();
        setAccess(resp.data?.data);
      }
    })();
  }, []);

  return access;
};
