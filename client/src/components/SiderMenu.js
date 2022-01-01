import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { Layout, Menu } from "antd";
import * as Icon from "@ant-design/icons";

import { useGetMenusQuery } from "../utils/apisSlice";

const RecursiveMenu = (menuDatas) => {

  const { SubMenu } = Menu;

  return menuDatas.map(menuData => {
    const MenuIcon = () => menuData.icon ? React.createElement(Icon[menuData?.icon]) : null;
    if (menuData.children.length === 0) {
      return (
        <Menu.Item key={menuData.path} icon={<MenuIcon />}>
          <NavLink to={menuData.path}>
            {menuData.name}
          </NavLink>
        </Menu.Item>
      );
    }
    return (
      <SubMenu key={menuData.path} title={menuData.name} icon={<MenuIcon />}>
        {RecursiveMenu(menuData.children)}
      </SubMenu>
    );
  });
}

const SiderMenu = (props) => {

  const { singlePath } = props;
  const [collapsed, setCollapsed] = useState(false);

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetMenusQuery("siderMenus");

  const singleMenuDatas = isSuccess && [data.data.find(menuData => menuData.path === singlePath)];

  const { Sider, Content, Footer } = Layout;

  return (
    <Layout style={{ minHeight: "90vh" }}>
      <Sider
        collapsible
        collapsed={collapsed} 
        onCollapse={()=>setCollapsed(!collapsed)}
        width={200} 
        className="site-layout-background"
      >
        {
          isSuccess ? (
            <Menu
              mode="inline"
              style={{ height: "100%", borderRight: 0 }}
            >
              {singleMenuDatas.map(singleMenuData => RecursiveMenu(singleMenuData.children))}
            </Menu>
          ) : (<div></div>)
        }
      </Sider>
      <Layout>
        <Content
          className="site-layout-background"
          style={{padding: 24, margin: 0, minHeight: 280}}
        >
          {props.children}
        </Content>
        <Footer style={{ textAlign: "center" }}>DataHouse ©2021 Created by Yang Hua</Footer>
      </Layout>
    </Layout>
  );
}

export default SiderMenu;
