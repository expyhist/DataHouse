import React from "react";
import { NavLink, withRouter } from "react-router-dom";

import { Layout, Menu } from "antd";

const Header = () => {

  const { Header } = Layout;

  return (
    <Header className="header">
      <Menu 
        theme="dark" 
        mode="horizontal" 
      >
        <Menu.Item key="/demands">
          <NavLink to="/demands">
            需求系统
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/tables">
          <NavLink to="/tables">
            报表系统
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/sysconfigs">
          <NavLink to="/sysconfigs">
            全局配置
          </NavLink>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default withRouter(Header);