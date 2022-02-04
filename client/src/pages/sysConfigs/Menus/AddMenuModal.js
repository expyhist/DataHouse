import React, { useState } from 'react';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import Select from 'antd/lib/select';

import { defineConfig } from '@/../config/config';
import { useAddNewMenuMutation } from '../sysConfigsSlice';
import { useGetMenusQuery } from '@/utils/apisSlice';
import withModalForm from '@/utils/withModalForm';
import FormInModal from '@/utils/FormInModal';

function MenuForm({ form }) {
  const { Option } = Select;
  const { sysConfigsColumnsInfo } = defineConfig;

  const {
    data,
    isLoading,
    isSuccess,
    isError,
  } = useGetMenusQuery();

  if (isLoading || isError) {
    return null;
  }

  const name = 'create_menus_form_in_modal';
  const entriesData = sysConfigsColumnsInfo.AddMenuFormColumns;
  const mapFn = ([key, value]) => {
    let rules = [];
    let content = <Input />;
    switch (key) {
      case 'path':
        rules = [
          { required: true, message: `请输入${value}!` },
          {
            validator: async (_, path) => {
              if (!/^(\/\w+)+/.test(path)) {
                return Promise.reject(new Error('输入正确的路径格式。如，/a，/a/b'));
              }
              return null;
            },
          },
        ];
        break;
      case 'name':
        rules = [{ required: true, message: `请输入${value}!` }];
        break;
      case 'parentPath':
        content = (
          <Select placeholder="Please select a value">
            {
              isSuccess && data.data.map((item) => (
                <Option value={item.path} key={item.path}>
                  {item.path}
                </Option>
              ))
            }
          </Select>
        );
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
        {content}
      </Form.Item>
    );
  };

  return FormInModal(form, name, entriesData, mapFn);
}

const CreateMenuForm = withModalForm(MenuForm);

function AddMenuModal() {
  const [visible, setVisible] = useState(false);
  const [addNewMenu] = useAddNewMenuMutation();

  const onCreate = async (formData) => {
    try {
      await addNewMenu(formData).unwrap();
      setVisible(false);
      message.success('菜单添加成功', 3);
    } catch (err) {
      message.error(`菜单添加失败，错误:${err.data.error}`, 3);
    }
  };

  return (
    <CreateMenuForm
      buttonTitle="新增"
      onClick={() => {
        setVisible(true);
      }}
      visible={visible}
      title="新增菜单"
      onCreate={onCreate}
      onCancel={() => {
        setVisible(false);
      }}
      okText="Create"
    />
  );
}

export default AddMenuModal;
