import React from 'react';

import Layout from 'antd/lib/layout';

import Header from './Header';
import SiderMenu from './SiderMenu';
import Copyright from './Copyright';

function PrivateLayout({ children }) {
  const { Content, Footer } = Layout;

  return (
    <Layout>
      <Header />
      <Layout style={{ minHeight: '85vh' }}>
        <SiderMenu />
        <Content
          className="site-layout-background"
          style={{ padding: 24, margin: 0, minHeight: 280 }}
        >
          {children}
        </Content>
      </Layout>
      <Footer>
        <Copyright />
      </Footer>
    </Layout>
  );
}

export default PrivateLayout;
