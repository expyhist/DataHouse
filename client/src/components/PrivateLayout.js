import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import Layout from 'antd/lib/layout';

import Header from './Header';
import SiderMenu from './SiderMenu';
import Copyright from './Copyright';

function PrivateLayout(props) {
  const { children } = props;
  const { path } = useRouteMatch();
  const { Content } = Layout;

  return (
    <Layout>
      <Header />
      <Layout style={{ minHeight: '90vh' }}>
        <SiderMenu singlePath={`${path}`} />
        <Content
          className="site-layout-background"
          style={{ padding: 24, margin: 0, minHeight: 280 }}
        >
          {children}
          <Copyright />
        </Content>
      </Layout>
    </Layout>
  );
}

export default PrivateLayout;
