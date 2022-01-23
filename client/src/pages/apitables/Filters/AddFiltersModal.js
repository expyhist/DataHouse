import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Button from 'antd/lib/button';
import message from 'antd/lib/message';

import FiltersNum from './FiltersNum';
import FiltersOption from './FiltersOption';
import { useAddNewFilterMutation } from './filtersSlice';
import { parseFilterFormData } from './parseFilterFormData';
import withModalForm from '@/utils/withModalForm';

function FiltersForm({ form, url, filtersNum }) {
  return (
    <>
      <FiltersNum initialValues={filtersNum} />
      <FiltersOption form={form} url={url} filtersNum={filtersNum} />
    </>
  );
}

const CreateFiltersForm = withModalForm(FiltersForm);

function AddFiltersModal({ id, url }) {
  const [visible, setVisible] = useState(false);
  const [addNewFilter] = useAddNewFilterMutation();

  const filtersNum = useSelector((state) => state.filtersNum);
  const lastFiltersNum = filtersNum[filtersNum.length - 1];

  const onCreate = async (formData) => {
    const payload = parseFilterFormData(lastFiltersNum, { apiTableId: id }, formData);

    try {
      await addNewFilter(payload)
        .unwrap()
        .then(() => {
          setVisible(false);
          message.success('筛选条件添加成功', 3);
        });
    } catch (err) {
      message.error(`筛选条件添加失败，错误:${err.data.error}`, 3);
    }
  };

  return (
    <>
      <Button
        type="link"
        onClick={() => {
          setVisible(true);
        }}
      >
        新增筛选条件
      </Button>
      <CreateFiltersForm
        visible={visible}
        title="新增筛选条件"
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        okText="Create"
        filtersNum={lastFiltersNum}
        url={url}
      />
    </>
  );
}

export default AddFiltersModal;
