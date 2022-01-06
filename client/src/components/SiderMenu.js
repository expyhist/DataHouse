import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Layout from "antd/lib/layout"
import Menu from "antd/lib/menu";
import * as Icons from "@ant-design/icons";

import { useGetMenusQuery } from "../utils/apisSlice";

const RecursiveMenu = (menuDatas) => {

  const { SubMenu } = Menu;

  return menuDatas.map(menuData => {
    const MenuIcon = () => menuData.icon ? React.createElement(Icons[menuData?.icon]) : null;
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
  const [collapsed, setCollapsed] = useState(true);

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetMenusQuery("siderMenus");

  const singleMenuDatas = isSuccess && [data.data.find(menuData => menuData.path === singlePath)];

  const { Sider } = Layout;

  return (
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
        ) : null
      }
    </Sider>
  );
}

export default SiderMenu;
