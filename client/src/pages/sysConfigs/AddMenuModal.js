import React, { useState } from 'react';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import Select from 'antd/lib/select';

import { defineConfig } from '@/../config/config';
import { useAddNewMenuMutation, useGetMenusQuery } from './sysConfigsSlice';
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

function MenuForm({ form }) {
  const { Option } = Select;
  const { sysConfigsColumnsInfo } = defineConfig;

  const {
    data,
    isLoading,
    isSuccess,
    isError,
  } = useGetMenusQuery('normal');

  if (isLoading || isError) {
    return null;
  }

  return (
    <Form
      {...layout}
      form={form}
      name="create_menus_form_in_modal"
    >
      {
        Object.entries(sysConfigsColumnsInfo.AddMenuFormColumns)
          .map(([key, value]) => {
            let rules;
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
              default:
                rules = [];
            }

            const content = key === 'parentPath' ? (
              <Select placeholder="Please select a value">
                {
                  isSuccess && data.data.map((aData) => (
                    <Option value={aData.path} key={aData.path}>
                      {aData.path}
                    </Option>
                  ))
                }
              </Select>
            ) : (<Input />);

            return (
              <Form.Item
                initialValue=""
                key={key}
                label={value}
                name={key}
                rules={rules}
              >
                {content}
              </Form.Item>
            );
          })
      }
    </Form>
  );
}

const CreateMenuForm = withModalForm(MenuForm);

function AddMenuModal() {
  const [visible, setVisible] = useState(false);
  const [addNewMenu] = useAddNewMenuMutation();

  const onCreate = async (formData) => {
    try {
      await addNewMenu(formData)
        .unwrap()
        .then(() => {
          setVisible(false);
          message.success('菜单添加成功', 3);
        });
    } catch (err) {
      message.error(`菜单添加失败，错误:${err.data.error}`, 3);
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
      <CreateMenuForm
        visible={visible}
        title="新增菜单"
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        okText="Create"
      />
    </div>
  );
}

export default AddMenuModal;
