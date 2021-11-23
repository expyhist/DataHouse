import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Button, message } from "antd";

import { FiltersNum } from "./FiltersNum";
import { FiltersOption } from "./FiltersOption";
import { useAddNewFilterMutation } from "./filtersSlice";
import { parseFilterFormData } from "./parseFilterFormData";
import withModalForm from "@/utils/withModalForm";

const FiltersForm = (props) => {

  const { form, url, filtersNum } = props;

  return (
    <>
      <FiltersNum initialValues={filtersNum} />
      <FiltersOption form={form} url={url} filtersNum={filtersNum} />
    </>
  );
}

const FiltersCreateForm = withModalForm(FiltersForm);

const AddFiltersForm = (props) => {
  
  const { id, url } = props;

  const [visible, setVisible] = useState(false);
  const [addNewFilter] = useAddNewFilterMutation();

  const filtersNum = useSelector(state => state.filtersNum);
  const lastFiltersNum = filtersNum[filtersNum.length-1];

  const onCreate = async (formData) => {

    const payload = parseFilterFormData(lastFiltersNum, "apiTalbeId", id, formData);

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