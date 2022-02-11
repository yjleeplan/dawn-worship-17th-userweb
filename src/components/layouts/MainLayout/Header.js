import { UserAddOutlined } from "@ant-design/icons";
import { Col, Image, Row } from "antd";
import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import UserAddModal from "../../common/modal/UserAddModal/UserAddModal";

const Header = ({ setIsLoading }) => {
  /** State */
  const [userAddModalVisible, setUserAddModalVisible] = useState(false);

  // 사용자 등록 모달 오픈
  const handleUserAddModalOpen = () => {
    setUserAddModalVisible(true);
  };

  // 사용자 등록 모달 닫기
  const handleUserAddModalClose = () => {
    setUserAddModalVisible(false);
  };

  return (
    <div id="header">
      <Row>
        <Col span={21}>
          <Image width={102} height={25} src={logo} preview={false} />
        </Col>
        <Col span={3} className="header-right">
          <div
            className="user-add-button-wrap"
            onClick={handleUserAddModalOpen}
          >
            <Row>
              <Col span={24}>
                <span className="user-add-button">
                  <UserAddOutlined />
                </span>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <span>등록</span>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <div id="userAddModal">
        <UserAddModal
          visible={userAddModalVisible}
          onCancel={handleUserAddModalClose}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
};

export default Header;
