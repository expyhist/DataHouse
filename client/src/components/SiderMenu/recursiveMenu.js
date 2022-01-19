import React from 'react';
import { NavLink } from 'react-router-dom';

import Menu from 'antd/lib/menu';
import * as Icons from '@ant-design/icons';

export const recursiveMenu = (menuDatas) => {
  const { SubMenu } = Menu;

  return menuDatas.map((menuData) => {
    function MenuIcon() {
      return menuData.icon ? React.createElement(Icons[menuData.icon]) : null;
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
        {recursiveMenu(menuData.children)}
      </SubMenu>
    );
  });
};
