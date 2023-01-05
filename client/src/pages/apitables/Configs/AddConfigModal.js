import React, { useState } from 'react';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';

import { defineConfig } from '@/../config/config';
import { useAddNewConfigMutation } from './configsSlice';
import withModalForm from '@/utils/withModalForm';
import PrivateForm from '@/utils/PrivateForm';

function ConfigForm({ form }) {
  const { apiTablesColumnsInfo } = defineConfig;

  const name = 'create_config_form_in_modal';
  const initialValues = {
    url: '',
    title: '',
    author: localStorage.getItem('email'),
    applicant: localStorage.getItem('email'),
    defaultParams: '{}',
  };
  const entriesData = apiTablesColumnsInfo.AddConfigFormColumns;
  const mapFn = ([key, value]) => {
    let rules = [{ required: true, message: `请输入${value}!` }];
    let disabled = false;
    switch (key) {
      case 'url':
        rules = [{ required: true, message: `请输入${value}!` }, { type: 'url', message: `请输入正确 ${value}!` }];
        break;
      case 'defaultParams':
        rules = [
          { required: true, message: `请输入${value}!` },
          {
            validator: async (_, defaultParams) => {
              try {
                JSON.parse(defaultParams);
                return true;
              } catch (error) {
                return Promise.reject(new Error('输入正确的JSON格式。如{}，{"a": 1, "b": 2}'));
              }
            },
          },
        ];
        break;
      case 'applicant':
      case 'author':
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

  return PrivateForm(form, name, entriesData, mapFn, initialValues);
}

const CreateConfigForm = withModalForm(ConfigForm);

function AddConfigModal() {
  const [visible, setVisible] = useState(false);
  const [addNewConfig] = useAddNewConfigMutation();

  const onCreate = async (formData) => {
    try {
      const resp = await addNewConfig(formData).unwrap();
      setVisible(false);
      resp.info.split(',').forEach((ele) => {
        message.success(`${ele}添加成功`, 3);
      });
    } catch (err) {
      message.error(`配置和菜单添加失败，${err.data.msg}`, 3);
    }
  };

  return (
    <CreateConfigForm
      buttonTitle="新增"
      onClick={() => {
        setVisible(true);
      }}
      visible={visible}
      title="新增API报表"
      onCreate={onCreate}
      onCancel={() => {
        setVisible(false);
      }}
      okText="Create"
    />
  );
}

export default AddConfigModal;
