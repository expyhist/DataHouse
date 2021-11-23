
import produce from "immer";
import { defineConfig } from "@/../config/config";

const filtersInfo = defineConfig.filtersInfo;

export const parseFilterFormData = (lastFiltersNum, idName, id, formData) => {
  
  const emptyPayload = produce(filtersInfo, draft => {
    Object.keys(filtersInfo).map(key => {
      draft[key] = [];
    });
  });

  const payload = produce(emptyPayload, draft => {
    draft[idName] = id;
    Object.entries(lastFiltersNum).forEach(([key, value]) => {
      let singlePayload = [];
      for (let i=0; i<parseInt(value); i++) {
        let singleFormData = {};
        filtersInfo[key]["values"].forEach(filterValue => {
          const unique = i + "-" + key + "-" + filterValue;
          singleFormData[filterValue] = formData[unique];
        });
        singlePayload.push(singleFormData);
      }
      draft[key] = singlePayload;
    });
  });

  return payload;
}