import { Col, Image, Row } from "antd";
import React from "react";
import logo from "../../../assets/images/logo.png";

const Header = () => {
  return (
    <div id="header">
      <Row>
        <Col span={24}>
          <Image width={102} height={25} src={logo} preview={false} />
        </Col>
      </Row>
    </div>
  );
};

export default Header;
