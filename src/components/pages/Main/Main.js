import {
  CheckCircleOutlined,
  ContactsOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Col, Image, Row } from "antd";
import React, { useState } from "react";
import title from "../../../assets/images/title.png";
import Comments from "../../common/Comments";
import SearchAttendanceModal from "../../common/modal/SearchAttendanceModal/SearchAttendanceModal";

const Main = ({ history, setIsLoading }) => {
  const [searchAttendanceModalVisible, setSearchAttendanceModalVisible] =
    useState(false);

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
        <Col
          span={8}
          onClick={() =>
            (window.location =
              "https://youtube.com/playlist?list=PLFdkyNDzHdpNVq4q7eDzTQcrHnkVvRs0R")
          }
        >
          <Row>
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
        <Col
          span={8}
          onClick={() => (window.location = "http://naver.me/FUGfHWej")}
        >
          <Row>
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
        <Col span={8} onClick={handleSearchAttendanceModalOpen}>
          <Row>
            <Col span={24} style={{ height: "73px" }}>
              <CheckCircleOutlined className="audit-outlined-icon" />
            </Col>
          </Row>
          <Row>
            <Col span={24} className="icon-text">
              출석
            </Col>
          </Row>
        </Col>
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
