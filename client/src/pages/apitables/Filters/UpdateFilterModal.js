import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import message from 'antd/lib/message';

import FiltersNum from './FiltersNum';
import FiltersOption from './FiltersOption';
import { useUpdateFilterMutation } from './filtersSlice';
import { parseFilterFormData } from './parseFilterFormData';
import withModalForm from '@/utils/withModalForm';

function FilterForm({
  form, url, initialValues, filtersNum,
}) {
  return (
    <>
      <FiltersNum initialValues={initialValues} />
      <FiltersOption form={form} url={url} filtersNum={filtersNum} />
    </>
  );
}

const UpdateFilterForm = withModalForm(FilterForm);

function UpdateFilterModal({ filterId, singleFilter, url }) {
  const [visible, setVisible] = useState(false);
  const [updateFilter] = useUpdateFilterMutation();

  const nowFiltersNum = {};
  const regex = /rangeDate|singleDate|text|enum/;

  Object.entries(singleFilter).map(([key, value]) => {
    if (regex.test(key)) {
      nowFiltersNum[key] = value.length;
    }
    return null;
  });

  const filtersNum = useSelector((state) => state.filtersNum);
  const lastFiltersNum = filtersNum[filtersNum.length - 1];

  const onCreate = async (formData) => {
    const payload = parseFilterFormData(lastFiltersNum, { filterId }, formData);

    try {
      await updateFilter(payload).unwrap();
      setVisible(false);
      message.success('筛选条件更新成功', 3);
    } catch (err) {
      message.error(`筛选条件更新失败，错误:${err.data.error}`, 3);
    }
  };

  return (
    <UpdateFilterForm
      buttonTitle="更新"
      onClick={() => {
        setVisible(true);
      }}
      visible={visible}
      title="更新API报表筛选条件"
      onCreate={onCreate}
      onCancel={() => {
        setVisible(false);
      }}
      okText="Update"
      data={singleFilter}
      url={url}
      initialValues={nowFiltersNum}
      filtersNum={lastFiltersNum}
    />
  );
}

export default UpdateFilterModal;
