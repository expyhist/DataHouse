import React, { useState } from 'react';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';

import { defineConfig } from '@/../config/config';
import { useUpdateConfigMutation } from './configsSlice';
import withModalForm from '@/utils/withModalForm';
import PrivateForm from '@/utils/PrivateForm';

function ConfigForm({ form, initialValues }) {
  const { apiTablesColumnsInfo } = defineConfig;

  const name = 'update_config_form_in_modal';
  const entriesData = apiTablesColumnsInfo.UpdateConfigFormColumns;
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
      case '_id':
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

const UpdateConfigForm = withModalForm(ConfigForm);

function UpdateConfigModal({ singleConfig }) {
  const [visible, setVisible] = useState(false);
  const [updateConfig] = useUpdateConfigMutation();

  const onCreate = async (formData) => {
    try {
      await updateConfig(formData).unwrap();
      setVisible(false);
      message.success('配置更新成功', 3);
    } catch (err) {
      message.error(`配置更新失败，${err.data.msg}`, 3);
    }
  };

  return (
    <UpdateConfigForm
      buttonTitle="更新"
      onClick={() => {
        setVisible(true);
      }}
      visible={visible}
      title="更新API报表配置"
      onCreate={onCreate}
      onCancel={() => {
        setVisible(false);
      }}
      okText="Update"
      initialValues={singleConfig}
    />
  );
}

export default UpdateConfigModal;
