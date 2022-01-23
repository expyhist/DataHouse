import React, { useState, useEffect } from 'react';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import Button from 'antd/lib/button';

import { defineConfig } from '@/../config/config';
import { useAddNewConfigMutation } from './configsSlice';
import { useAddNewMenuMutation } from '@/pages/sysConfigs/sysConfigsSlice';
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

function ConfigForm({ form }) {
  const { apiTablesColumnsInfo } = defineConfig;

  return (
    <Form
      {...layout}
      form={form}
      name="create_config_form_in_modal"
      initialValues={{
        url: '',
        title: '',
        author: localStorage.getItem('email'),
        applicant: localStorage.getItem('email'),
        defaultParams: '',
      }}
    >
      {
        Object.entries(apiTablesColumnsInfo.AddConfigFormColumns).map(([key, value]) => {
          let rules;
          let disabled;
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
              rules = [{ required: true, message: `请输入${value}!` }];
              disabled = false;
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

const CreateConfigForm = withModalForm(ConfigForm);

function AddConfigModal() {
  const [visible, setVisible] = useState(false);
  const [newConfig, setNewConfig] = useState({});
  const [addNewConfig] = useAddNewConfigMutation();
  const [addNewMenu] = useAddNewMenuMutation();

  const onCreate = async (formData) => {
    try {
      await addNewConfig(formData)
        .unwrap()
        .then((resp) => {
          setNewConfig(resp);
          setVisible(false);
          message.success('配置添加成功', 3);
        });
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
        })
          .unwrap()
          .then(() => {
            message.success('菜单添加成功', 3);
          });
      } catch (error) {
        message.error(`菜单添加失败，错误:${error.data.error}`, 3);
      }
    }
  }, [newConfig]);

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        新增
      </Button>
      <CreateConfigForm
        visible={visible}
        title="新增API报表"
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        okText="Create"
      />
    </>
  );
}

export default AddConfigModal;
