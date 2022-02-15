import { Col, Image, Row } from "antd";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import iconAttendance from "../../../assets/images/icon_attendance.png";
import iconPicture from "../../../assets/images/icon_picture.png";
import iconUserAdd from "../../../assets/images/icon_user_add.png";
import iconVideo from "../../../assets/images/icon_video.png";
import title from "../../../assets/images/title.png";
import Comments from "../../common/Comments";
import SearchAttendanceModal from "../../common/modal/SearchAttendanceModal/SearchAttendanceModal";
import UserAddModal from "../../common/modal/UserAddModal/UserAddModal";

const Main = ({ history, setIsLoading }) => {
  /** State */
  const [userAddModalVisible, setUserAddModalVisible] = useState(false);
  const [searchAttendanceModalVisible, setSearchAttendanceModalVisible] =
    useState(false);

  useEffect(() => {
    const { hostname } = window.location;
    if (_.includes(hostname, "dev")) {
      window.location.replace("https://dawn-worship-17th.saeum.or.kr/");
    }
    // eslint-disable-next-line
  }, []);

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

  // 영상 링크
  const handleVideoClick = () => {
    window.open(
      "https://youtube.com/playlist?list=PLFdkyNDzHdpNVq4q7eDzTQcrHnkVvRs0R"
    );
  };

  // 사진 링크
  const handlePictureClick = () => {
    window.open("http://naver.me/FUGfHWej");
  };

  return (
    <>
      <Row className="user-attendance-modal-title">
        <Col span={24}>
          <Image width={192} height={160} src={title} preview={false} />
        </Col>
      </Row>
      <Row className="user-attendance-modal-icon">
        <Col span={6} onClick={handleUserAddModalOpen} className="icon-wrap">
          <Image
            width={"80%"}
            height={"100%"}
            src={iconUserAdd}
            preview={false}
          />
        </Col>
        <Col
          span={6}
          onClick={handleSearchAttendanceModalOpen}
          className="icon-wrap"
        >
          <Image
            width={"80%"}
            height={"100%"}
            src={iconAttendance}
            preview={false}
          />
        </Col>
        <Col span={6} onClick={handleVideoClick} className="icon-wrap">
          <Image
            width={"80%"}
            height={"100%"}
            src={iconVideo}
            preview={false}
          />
        </Col>
        <Col span={6} onClick={handlePictureClick} className="icon-wrap">
          <Image
            width={"80%"}
            height={"100%"}
            src={iconPicture}
            preview={false}
          />
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
            attendanceAble={false}
          />
        </div>
      </Row>
      {/* <VideoPlayer /> */}
      <Comments setIsLoading={setIsLoading} />
    </>
  );
};

export default Main;
