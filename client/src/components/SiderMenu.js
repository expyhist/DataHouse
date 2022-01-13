import React, { useState } from 'react';
import { NavLink, withRouter, useRouteMatch } from 'react-router-dom';

import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import {
  SettingFilled, OrderedListOutlined, PieChartOutlined, BulbOutlined,
} from '@ant-design/icons';

import { useGetMenusQuery } from '../utils/apisSlice';

const icons = {
  SettingFilled,
  OrderedListOutlined,
  PieChartOutlined,
  BulbOutlined,
};

const RecursiveMenu = (menuDatas) => {
  const { SubMenu } = Menu;

  return menuDatas.map((menuData) => {
    function MenuIcon() {
      return menuData?.icon ? React.createElement(icons[menuData.icon]) : null;
    }

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
};

function SiderMenu() {
  const [collapsed, setCollapsed] = useState(true);

  const { path } = useRouteMatch();

  const {
    data,
    isSuccess,
  } = useGetMenusQuery('siderMenus');

  const singleMenuDatas = isSuccess && [data.data.find((menuData) => menuData.path === path)];

  const { Sider } = Layout;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      width={200}
      className="site-layout-background"
    >
      {
        isSuccess ? (
          <Menu
            mode="inline"
            style={{ height: '115%', borderRight: 0 }}
          >
            {singleMenuDatas.map((singleMenuData) => RecursiveMenu(singleMenuData.children))}
          </Menu>
        ) : null
      }
    </Sider>
  );
}

export default withRouter(SiderMenu);
