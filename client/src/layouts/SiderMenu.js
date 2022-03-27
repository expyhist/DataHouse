import React, { useState, useContext } from 'react';
import { useRouteMatch, NavLink } from 'react-router-dom';
import { Base64 } from 'js-base64';

import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import * as Icons from '@ant-design/icons';

import { useGetMenusByAccessQuery } from '@/utils/apisSlice';

import { AccessContext } from '@/utils/AccessContext';

const recursiveMenu = (menuData) => {
  const { SubMenu } = Menu;

  return menuData.map((item) => {
    const {
      icon, path, name, children,
    } = item;

    function MenuIcon() {
      return icon ? React.createElement(Icons[icon]) : null;
    }

    if (children.length === 0) {
      return (
        <Menu.Item key={path} icon={<MenuIcon />}>
          <NavLink to={{ pathname: path, state: { prevPath: location.pathname } }}>
            {name}
          </NavLink>
        </Menu.Item>
      );
    }

    return (
      <SubMenu key={path} title={name} icon={<MenuIcon />}>
        {recursiveMenu(children)}
      </SubMenu>
    );
  });
};

function SiderMenu() {
  const [collapsed, setCollapsed] = useState(true);
  const access = useContext(AccessContext);
  const { path } = useRouteMatch();

  const { Sider } = Layout;

  const {
    data,
    isLoading,
    isSuccess,
    isError,
  } = useGetMenusByAccessQuery(Base64.encode(Object.keys(access).toString()));

  if (isLoading || isError) {
    return null;
  }

  const singleMenuData = isSuccess && data.data.filter((item) => item.path === path);

  return (
    isSuccess && (
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        style={{ background: 'white' }}
      >
        <Menu mode="inline" style={{ borderRight: 0 }}>
          {singleMenuData.map((item) => recursiveMenu(item.children))}
        </Menu>
      </Sider>
    )
  );
}

export default SiderMenu;
