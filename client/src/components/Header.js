import React from "react";
import { NavLink, withRouter } from "react-router-dom";

import { Button, Layout, Menu } from "antd";
import { LoginOutlined } from "@ant-design/icons";

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
        <Menu.Item key="/loginout">
          <NavLink to="/users">
            <Button danger type="text" icon={<LoginOutlined />} onClick={() => localStorage.clear()} />
          </NavLink>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default withRouter(Header);