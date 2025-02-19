import { Spin } from "antd";
import React, { useState } from "react";
import Content from "./Content";
import Header from "./Header";

const RankMobileLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Spin spinning={isLoading} tip="잠시만 기다려주세요..">
      <div id="rank-mobile-layout">
        <Header />
        <Content>{React.cloneElement(children, { setIsLoading })}</Content>
      </div>
    </Spin>
  );
};

export default RankMobileLayout;
