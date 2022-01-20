import React, { useState } from 'react';

import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';

import { defineConfig } from '@/../config/config';
import { useAddNewDemandMutation } from './demandsSlice';
import withModalForm from '@/utils/withModalForm';

const layout = {
  labelCol: {
    offset: 2,
    span: 5,
  },
  wrapperCol: {
    span: 15,
  },
};

function DemandForm({ form }) {
  const { demandsColumnsInfo } = defineConfig;

  return (
    <Form
      {...layout}
      form={form}
      name="create_demand_form_in_modal"
      initialValues={{
        description: '',
        content: '',
        author: localStorage.getItem('email'),
        applicant: localStorage.getItem('email'),
      }}
    >
      {
        Object.entries(demandsColumnsInfo.AddDemandFormColumns)
          .map(([key, value]) => (
            <Form.Item
              key={key}
              label={value}
              name={key}
              rules={[{ required: true, message: `请输入${value}!` }]}
            >
              <Input disabled={!!/author|applicant/.test(key)} />
            </Form.Item>
          ))
      }
    </Form>
  );
}

const CreateDemandForm = withModalForm(DemandForm);

function AddDemandModal() {
  const [visible, setVisible] = useState(false);
  const [addNewDeamnd] = useAddNewDemandMutation();

  const onCreate = async (formData) => {
    const { description, content, applicant } = formData;
    try {
      await addNewDeamnd({
        description, content, applicant, status: 'waiting', reviewStatus: 'stop',
      })
        .unwrap()
        .then(() => {
          setVisible(false);
          message.success('需求添加成功', 3);
        });
    } catch (err) {
      message.error(`需求添加失败，错误:${err.data.error}`, 3);
    }
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        新增
      </Button>
      <CreateDemandForm
        visible={visible}
        title="新增需求"
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        okText="Create"
      />
    </div>
  );
}

export default AddDemandModal;
