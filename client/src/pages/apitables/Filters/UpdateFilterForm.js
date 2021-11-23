import React, { useState } from "react";

import { Form, Input, Button, message } from "antd";

import { FiltersNum } from "./FiltersNum";
import { FiltersOption } from "./FiltersOption";
import { SingleFiltersOption } from "./SingleFiltersOption";
import { useUpdateFilterMutation } from "./filtersSlice";
import { defineConfig } from "@/../config/config";
import withModalForm from "@/utils/withModalForm";

const FilterForm = (props) => {

  const { form, url, filtersNum } = props;
  return (
    <>
      <FiltersNum initialValues={filtersNum}/>
      <FiltersOption form={form} url={url} filtersNum={filtersNum} />
    </>
  );
}

const FilterUpdateForm = withModalForm(FilterForm);

const UpdateFilterForm = (props) => {

  const { singleFilter, url } = props;
  const [visible, setVisible] = useState(false);
  const [updateFilter] = useUpdateFilterMutation();

  const nowFiltersNum = {};
  const regex = new RegExp("rangeDate|singleDate|text|enum");

  Object.entries(singleFilter).map(([key, value]) => {
    if (regex.test(key)) {
      nowFiltersNum[key] = value.length;
    }
  });

  const onCreate = async (formData) => {
    try {
      await updateFilter(formData)
        .unwrap()
        .then(() => {
          setVisible(false);
          message.success("筛选条件更新成功", 3);
        });
    } catch (err) {
      message.error(`筛选条件更新失败，错误:${err.data.error}`, 3)
    }
  }

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        更新
      </Button> 
        <FilterUpdateForm
          visible={visible}
          title="更新API报表筛选条件"
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
          okText={"Update"}
          data={singleFilter}
          url={url}
          filtersNum={nowFiltersNum}
        />
    </div>
  );
}

export default UpdateFilterForm;