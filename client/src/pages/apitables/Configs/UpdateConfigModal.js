import React, { useState } from 'react';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';

import { defineConfig } from '@/../config/config';
import { useUpdateConfigMutation } from './configsSlice';
import withModalForm from '@/utils/withModalForm';

const layout = {
  labelCol: {
    offset: 2,
    span: 5,
  },
  wrapperCol: {
    span: 10,
  },
};

function ConfigForm({ form, initialValues }) {
  const { apiTablesColumnsInfo } = defineConfig;

  return (
    <Form
      {...layout}
      form={form}
      name="update_config_form_in_modal"
      initialValues={initialValues}
    >
      {
        Object.entries(apiTablesColumnsInfo.UpdateConfigFormColumns).map(([key, value]) => {
          let rules;
          let disabled;
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
              rules = [{ required: true, message: `请输入${value}!` }];
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
        })
      }
    </Form>
  );
}

const UpdateConfigForm = withModalForm(ConfigForm);

function UpdateConfigModal({ singleConfig }) {
  const [visible, setVisible] = useState(false);
  const [updateConfig] = useUpdateConfigMutation();

  const onCreate = async (formData) => {
    try {
      await updateConfig(formData)
        .unwrap()
        .then(() => {
          setVisible(false);
          message.success('配置更新成功', 3);
        });
    } catch (err) {
      message.error(`配置更新失败，错误:${err.data.error}`, 3);
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
        更新
      </Button>
      <UpdateConfigForm
        visible={visible}
        title="更新API报表配置"
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        okText="Update"
        initialValues={singleConfig}
      />
    </div>
  );
}

export default UpdateConfigModal;
