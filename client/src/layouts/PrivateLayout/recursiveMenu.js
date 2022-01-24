import React from 'react';
import { NavLink } from 'react-router-dom';

import Menu from 'antd/lib/menu';
import * as Icons from '@ant-design/icons';

export const recursiveMenu = (menuDatas) => {
  const { SubMenu } = Menu;

  return menuDatas.map((menuData) => {
    const { path, name, children } = menuData;

    function MenuIcon() {
      return menuData.icon ? React.createElement(Icons[menuData.icon]) : null;
    }

    if (menuData.children.length === 0) {
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
