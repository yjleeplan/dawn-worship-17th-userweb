import { Col, Image, Row, Tag } from "antd";
import React from "react";

const Header = ({ isAdmin }) => {
  return (
    <div id="header">
      {isAdmin ? (
        <Row>
          <Col span={18}>
            <Image
              width={102}
              height={25}
              src={
                "https://dawn-worship-17th-images.s3.ap-northeast-2.amazonaws.com/logo.png"
              }
              preview={false}
            />
          </Col>
          <Col span={6} className="header-right">
            <Tag color="#cd201f">관리자 모드</Tag>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col span={24}>
            <Image
              width={102}
              height={25}
              src={
                "https://dawn-worship-17th-images.s3.ap-northeast-2.amazonaws.com/logo.png"
              }
              preview={false}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Header;
