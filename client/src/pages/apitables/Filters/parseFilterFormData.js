import produce from 'immer';
import { defineConfig } from '@/../config/config';

const { filtersInfo } = defineConfig;

export const parseFilterFormData = (lastFiltersNum, extraId, formData) => {
  const emptyPayload = {};
  Object.entries(filtersInfo).forEach(([filterName]) => {
    emptyPayload[filterName] = [];
  });

  const payload = produce(emptyPayload, (draft) => {
    const data = { ...draft, ...extraId };

    Object.entries(lastFiltersNum).forEach(([key, value]) => {
      const singlePayload = [];
      for (let i = 0; i < parseInt(value, 10); i += 1) {
        const singleFormData = {};
        filtersInfo[key].values.forEach((filterValue) => {
          const unique = `${i}-${key}-${filterValue}`;
          singleFormData[filterValue] = formData[unique];
        });
        singlePayload.push(singleFormData);
      }
      data[key] = singlePayload;
    });
    return data;
  });

  return payload;
};
