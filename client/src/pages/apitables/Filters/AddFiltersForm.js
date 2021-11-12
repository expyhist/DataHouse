import React, { useState } from "react";
import { useSelector } from "react-redux";
import produce from "immer";

import { Button, message } from "antd";

import { FiltersNum } from "./FiltersNum";
import { FiltersOption } from "./FiltersOption";
import { defineConfig } from "@/../config/config.js";
import { useAddNewFilterMutation } from "./filtersSlice";
import withModelForm from "@/utils/withModelForm";

const filtersInfo = defineConfig.filtersInfo;

const FiltersForm = (props) => {
  const { form, url, filtersNum } = props;
  return (
    <>
      <FiltersNum />
      <FiltersOption form={form} url={url} filtersNum={filtersNum} />
    </>
  );
}

const FiltersCreateForm = withModelForm(FiltersForm);

const AddFiltersForm = (props) => {
  
  const { id, url } = props;

  const [visible, setVisible] = useState(false);
  const [addNewFilter] = useAddNewFilterMutation();

  const filtersNum = useSelector(state => state.filtersNum);
  const lastFiltersNum = filtersNum[filtersNum.length-1];

  const onCreate = async (formData) => {

    const emptyPayload = produce(filtersInfo, draft => {
      Object.keys(filtersInfo).map(key => {
        draft[key] = [];
      });
    });

    const payload = produce(emptyPayload, draft => {
      draft["apiTableId"] = id;
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

    try {
      await addNewFilter(payload)
        .unwrap()
        .then(() => {
          setVisible(false);
          message.success("筛选条件添加成功", 3);
        });
    } catch (err) {
      message.error(`筛选条件添加失败，错误:${err.data.error}`, 3)
    }
  }

  return (
    <div>
      <Button
        type="link"
        onClick={() => {
          setVisible(true);
        }}
      >
        新增筛选条件
      </Button>
      <FiltersCreateForm
        visible={visible}
        title="新增筛选条件"
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        okText={"Create"}
        filtersNum={lastFiltersNum}
        url={url}
      />
    </div>
  );
}

export default AddFiltersForm;