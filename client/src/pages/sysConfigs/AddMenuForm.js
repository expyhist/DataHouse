import React, { useState } from "react";

import { Form, Input, Button, message, Select } from "antd";

import { defineConfig } from "@/../config/config";
import { useAddNewMenuMutation } from "./sysConfigsSlice";
import withModelForm from "@/utils/withModelForm";

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
  const options = ["/demands", "/demands/list", "/tables", "/tables/databoard:id", "/tables/databoard/614f566883266f42b019da13", "/tables/configs/list", "/sysconfigs"]

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
              options
                .map(option => (
                  <Option value={option} key={option}>
                    {option}
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

const MenuCreateForm = withModelForm(MenuForm);

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