import React, { useState } from "react";

import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import message from "antd/lib/message";
import Select from "antd/lib/select";

import { defineConfig } from "@/../config/config";
import { useAddNewMenuMutation, useGetMenusQuery } from "./sysConfigsSlice";
import withModalForm from "@/utils/withModalForm";

const layout = {
  labelCol: {
    offset: 2,
    span: 5
  },
  wrapperCol: {
    span: 15
  }
};

const MenuForm = (props) => {

  const { form } = props;
  const { Option } = Select;
  const sysConfigsColumnsInfo = defineConfig.sysConfigsColumnsInfo;

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetMenusQuery();

  return (
    <Form
      {...layout}
      form={form}
      name="menus_create_form_in_modal"
    >
      {
        Object.entries(sysConfigsColumnsInfo.AddMenuFormColumns)
          .map(([key, value]) => {
            const content = key === "parent" ? (
              <Select placeholder="Please select a value">
              {
                isSuccess 
                && 
                data.data.map(aData => (
                  <Option value={aData.path} key={aData.path}>
                    {aData.path}
                  </Option>
                  )
                )
              }
              </Select>
            ) : (<Input />);
            
            return (
              <Form.Item
                initialValue={""}
                key={key}
                label={value}
                name={key}
                rules={[new RegExp("icon|parent").test(key) ? {} : {required: true, message: `请输入 ${value}!`}]}
              >
                {content}
              </Form.Item>
            );
          })
      }
    </Form>
  ); 
}

const MenuCreateForm = withModalForm(MenuForm);

const AddMenuForm = () => {

  const [visible, setVisible] = useState(false);
  const [addNewMenu] = useAddNewMenuMutation();

  const onCreate = async (formData) => {
    try {
      await addNewMenu(formData)
        .unwrap()
        .then(() => {
          setVisible(false);
          message.success("菜单添加成功", 3);
        });
    } catch (err) {
      message.error(`菜单添加失败，错误:${err.data.error}`, 3)
    }
  }

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
      <MenuCreateForm
        visible={visible}
        title="新增菜单"
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        okText={"Create"}
      />
    </div>
  );

}

export default AddMenuForm;