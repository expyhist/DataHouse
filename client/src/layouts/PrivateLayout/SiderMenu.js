import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';

import { recursiveMenu } from './recursiveMenu';
import { useGetMenusByAccessMutation } from '@/utils/apisSlice';
import { useAccess } from '@/utils/useAccess';

function SiderMenu() {
  const [singleMenuData, setSingleMenuData] = useState(null);
  const [collapsed, setCollapsed] = useState(true);
  const [getMenusByAccess] = useGetMenusByAccessMutation();
  const { path } = useRouteMatch();
  const access = useAccess();

  useEffect(() => {
    const getSiderMenu = async () => {
      const resp = await getMenusByAccess({ path: Object.keys(access) });
      const menuData = resp.data.data.filter((item) => item.path === path);
      setSingleMenuData(menuData);
    };
    getSiderMenu();
  }, [access]);

  const { Sider } = Layout;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      style={{ background: 'white' }}
    >
      {
        singleMenuData ? (
          <Menu mode="inline" style={{ borderRight: 0 }}>
            {
              singleMenuData.map((item) => recursiveMenu(item.children))
            }
          </Menu>
        ) : null
      }
    </Sider>
  );
}

export default SiderMenu;
