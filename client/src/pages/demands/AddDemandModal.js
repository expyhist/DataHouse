import React, { useState } from 'react';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';

import { defineConfig } from '@/../config/config';
import { useAddNewDemandMutation } from './demandsSlice';
import withModalForm from '@/utils/withModalForm';
import FormInModal from '@/utils/FormInModal';

function DemandForm({ form }) {
  const { demandsColumnsInfo } = defineConfig;

  const name = 'create_demand_form_in_modal';
  const initialValues = {
    description: '',
    content: '',
    applicant: localStorage.getItem('email'),
  };
  const entriesData = demandsColumnsInfo.AddDemandFormColumns;
  const mapFn = ([key, value]) => {
    const rules = [{ required: true, message: `请输入${value}!` }];
    let disabled = false;
    switch (key) {
      case 'applicant':
        disabled = true;
        break;
      default:
    }
    return (
      <Form.Item
        key={key}
        label={value}
        name={key}
        rules={rules}
      >
        <Input disabled={disabled} />
      </Form.Item>
    );
  };

  return FormInModal(form, name, entriesData, mapFn, initialValues);
}

const CreateDemandForm = withModalForm(DemandForm);

function AddDemandModal() {
  const [visible, setVisible] = useState(false);
  const [addNewDeamnd] = useAddNewDemandMutation();

  const onCreate = async (formData) => {
    const {
      description, content, author, applicant,
    } = formData;
    try {
      await addNewDeamnd({
        description,
        content,
        author,
        applicant,
        status: 'waiting',
        reviewStatus: 'stop',
      }).unwrap();
      setVisible(false);
      message.success('需求添加成功', 3);
    } catch (err) {
      message.error(`需求添加失败，错误:${err.data.error}`, 3);
    }
  };

  return (
    <CreateDemandForm
      buttonTitle="新增"
      onClick={() => {
        setVisible(true);
      }}
      visible={visible}
      title="新增需求"
      onCreate={onCreate}
      onCancel={() => {
        setVisible(false);
      }}
      okText="Create"
    />
  );
}

export default AddDemandModal;
