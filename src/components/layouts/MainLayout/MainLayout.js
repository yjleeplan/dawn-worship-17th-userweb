import { Spin } from "antd";
import React, { useState } from "react";
import Content from "./Content";
import Header from "./Header";

const MainLayout = ({ children, isAdmin = false, buttonType }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Spin spinning={isLoading} tip="잠시만 기다려주세요..">
      <div id="main-layout">
        <Header isAdmin={isAdmin} buttonType={buttonType} />
        <Content>{React.cloneElement(children, { setIsLoading, isAdmin })}</Content>
      </div>
    </Spin>
  );
};

export default MainLayout;
