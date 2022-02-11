import {
  CheckCircleOutlined,
  ContactsOutlined,
  UserAddOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Col, Image, Row } from "antd";
import React, { useState } from "react";
import title from "../../../assets/images/title.png";
import Comments from "../../common/Comments";
import SearchAttendanceModal from "../../common/modal/SearchAttendanceModal/SearchAttendanceModal";
import UserAddModal from "../../common/modal/UserAddModal/UserAddModal";

const Main = ({ history, setIsLoading }) => {
  /** State */
  const [userAddModalVisible, setUserAddModalVisible] = useState(false);
  const [searchAttendanceModalVisible, setSearchAttendanceModalVisible] =
    useState(false);

  // 사용자 등록 모달 오픈
  const handleUserAddModalOpen = () => {
    setUserAddModalVisible(true);
  };

  // 사용자 등록 모달 닫기
  const handleUserAddModalClose = () => {
    setUserAddModalVisible(false);
  };

  // 출석체크 모달 오픈
  const handleSearchAttendanceModalOpen = () => {
    setSearchAttendanceModalVisible(true);
  };

  // 출석체크 모달 닫기
  const handleSearchAttendanceModalClose = () => {
    setSearchAttendanceModalVisible(false);
  };

  return (
    <>
      <Row className="user-attendance-modal-title">
        <Col span={24}>
          <Image width={192} height={160} src={title} preview={false} />
        </Col>
      </Row>
      <Row className="user-attendance-modal-icon">
        <Col span={6} onClick={handleSearchAttendanceModalOpen}>
          <Row className="icon-wrap">
            <Col span={24}>
              <CheckCircleOutlined className="audit-outlined-icon" />
            </Col>
          </Row>
          <Row>
            <Col span={24} className="icon-text">
              출석
            </Col>
          </Row>
        </Col>
        <Col
          span={6}
          onClick={handleUserAddModalOpen}
          style={{ paddingRight: "14px" }}
        >
          <Row className="icon-wrap">
            <Col span={24}>
              <UserAddOutlined className="user-add-outlined-icon" />
            </Col>
          </Row>
          <Row>
            <Col span={24} className="icon-text">
              등록
            </Col>
          </Row>
        </Col>
        <Col
          span={6}
          onClick={() =>
            window.open(
              "https://youtube.com/playlist?list=PLFdkyNDzHdpNVq4q7eDzTQcrHnkVvRs0R"
            )
          }
          style={{ paddingRight: "10px" }}
        >
          <Row className="icon-wrap">
            <Col span={24}>
              <YoutubeOutlined className="youtube-outlined-icon" />
            </Col>
          </Row>
          <Row>
            <Col span={24} className="icon-text">
              영상
            </Col>
          </Row>
        </Col>
        <Col span={6} onClick={() => window.open("http://naver.me/FUGfHWej")}>
          <Row className="icon-wrap">
            <Col span={24}>
              <ContactsOutlined className="picture-outlined-icon" />
            </Col>
          </Row>
          <Row>
            <Col span={24} className="icon-text">
              사진
            </Col>
          </Row>
        </Col>
        <div id="userAddModal">
          <UserAddModal
            visible={userAddModalVisible}
            onCancel={handleUserAddModalClose}
            setIsLoading={setIsLoading}
          />
        </div>
        <div id="searchAttendanceModal">
          <SearchAttendanceModal
            visible={searchAttendanceModalVisible}
            onCancel={handleSearchAttendanceModalClose}
            setIsLoading={setIsLoading}
          />
        </div>
      </Row>
      {/* <VideoPlayer /> */}
      <Comments setIsLoading={setIsLoading} />
    </>
  );
};

export default Main;
