import { Base64 } from 'js-base64';

import { useGetAuthsQuery } from './apisSlice';

export const useAccess = () => {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
  } = useGetAuthsQuery(Base64.encode('{}'));

  if (isLoading || isError) {
    return { '/test': true };
  }

  return isSuccess && data.data;
};
