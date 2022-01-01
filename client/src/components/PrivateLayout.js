import React from "react";
import { useRouteMatch } from "react-router-dom";

import { Layout } from "antd";

import Header from "./Header";
import SiderMenu from "./SiderMenu";

const PrivateLayout = (props) => {

  const { path } = useRouteMatch();

  return (
    <Layout>
      <Header />
      <SiderMenu singlePath={`${path}`} >
        {props.children}  
      </SiderMenu>
    </Layout>
  );
}

export default PrivateLayout;