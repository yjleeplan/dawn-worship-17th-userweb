import { Col, Image, Row } from "antd";
import React, { useState } from "react";
import iconAttendance from "../../../assets/images/icon_attendance.png";
import iconPicture from "../../../assets/images/icon_picture.png";
import iconUserAdd from "../../../assets/images/icon_user_add.png";
import iconVideo from "../../../assets/images/icon_video.png";
import title from "../../../assets/images/title.png";
import Comments from "../../common/Comments";
import AdminSearchAttendanceModal from "../../common/modal/AdminSearchAttendanceModal/AdminSearchAttendanceModal";
import UserAddModal from "../../common/modal/UserAddModal/UserAddModal";

const Admin = ({ setIsLoading }) => {
  /** State */
  const [userAddModalVisible, setUserAddModalVisible] = useState(false);
  const [searchAttendanceModalVisible, setSearchAttendanceModalVisible] = useState(false);

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
    window.open("https://www.youtube.com/playlist?list=PLFdkyNDzHdpOhsmcXQ_xyz37py0Lfl4Hg");
  };

  // 사진 링크
  const handlePictureClick = () => {
    window.open("https://blog.naver.com/elohimg/223765649591");
  };

  return (
    <>
      <Row className="user-attendance-modal-title">
        <Col span={24}>
          <Image width={300} height={160} src={title} preview={false} />
        </Col>
      </Row>
      <Row className="user-attendance-modal-icon">
        <Col span={6} onClick={handleUserAddModalOpen} className="icon-wrap">
          <Image width={"80%"} height={"100%"} src={iconUserAdd} preview={false} />
        </Col>
        <Col span={6} onClick={handleSearchAttendanceModalOpen} className="icon-wrap">
          <Image width={"80%"} height={"100%"} src={iconAttendance} preview={false} />
        </Col>
        <Col span={6} onClick={handleVideoClick} className="icon-wrap">
          <Image width={"80%"} height={"100%"} src={iconVideo} preview={false} />
        </Col>
        <Col span={6} onClick={handlePictureClick} className="icon-wrap">
          <Image width={"80%"} height={"100%"} src={iconPicture} preview={false} />
        </Col>
        <div id="userAddModal">
          <UserAddModal visible={userAddModalVisible} onCancel={handleUserAddModalClose} setIsLoading={setIsLoading} />
        </div>
        <div id="searchAttendanceModal">
          <AdminSearchAttendanceModal
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

export default Admin;
