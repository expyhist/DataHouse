import React, { useState, useEffect } from 'react';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';

import { defineConfig } from '@/../config/config';
import { useAddNewConfigMutation } from './configsSlice';
import { useAddNewMenuMutation } from '@/pages/sysConfigs/sysConfigsSlice';
import withModalForm from '@/utils/withModalForm';
import FormInModal from '@/utils/FormInModal';

function ConfigForm({ form }) {
  const { apiTablesColumnsInfo } = defineConfig;

  const name = 'create_config_form_in_modal';
  const initialValues = {
    url: '',
    title: '',
    author: localStorage.getItem('email'),
    applicant: localStorage.getItem('email'),
    defaultParams: '',
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
        rules = [];
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

  return FormInModal(form, name, initialValues, entriesData, mapFn);
}

const CreateConfigForm = withModalForm(ConfigForm);

function AddConfigModal() {
  const [visible, setVisible] = useState(false);
  const [newConfig, setNewConfig] = useState({});
  const [addNewConfig] = useAddNewConfigMutation();
  const [addNewMenu] = useAddNewMenuMutation();

  const onCreate = async (formData) => {
    try {
      const resp = await addNewConfig(formData).unwrap();
      setNewConfig(resp);
      setVisible(false);
      message.success('配置添加成功', 3);
    } catch (err) {
      message.error(`配置添加失败，错误:${err.data.error}`, 3);
    }
  };

  useEffect(async () => {
    if (Object.keys(newConfig).length !== 0) {
      try {
        await addNewMenu({
          apiTableId: newConfig.id,
          parentPath: '/tables/databoard/:id',
          path: `/tables/databoard/${newConfig.id}`,
          name: newConfig.title,
          icon: '',
        }).unwrap();
        message.success('菜单添加成功', 3);
        // await
      } catch (error) {
        message.error(`菜单添加失败，错误:${error.data.error}`, 3);
      }
    }
  }, [newConfig]);

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
