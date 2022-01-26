import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import * as Icons from '@ant-design/icons';

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
          <NavLink to={path}>
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

function SiderMenu({ menuData }) {
  const [collapsed, setCollapsed] = useState(true);

  const { Sider } = Layout;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      style={{ background: 'white' }}
    >
      <Menu mode="inline" style={{ borderRight: 0 }}>
        {menuData ? menuData.map((item) => recursiveMenu(item.children)) : null}
      </Menu>
    </Sider>
  );
}

export default SiderMenu;
