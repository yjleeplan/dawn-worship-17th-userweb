import { Col, Divider, Image, message, Modal, Row, Typography } from "antd";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import * as api from "../../../../api";
import title from "../../../../assets/images/attendance_title.png";
import Stamp from "../../Stamp";

const { Text } = Typography;

const UserAttendanceModal = ({ visible, onCancel, userInfo, setIsLoading }) => {
  /** State */
  const [userDetail, setUserDetail] = useState([]);
  const [today, setToday] = useState(0);
  const [hour, setHour] = useState(0);

  /** Effect */
  useEffect(() => {
    const currentDate = new Date();
    const currentToday = currentDate.getDate();
    const currentHour = moment().hour();

    setToday(currentToday);
    setHour(currentHour);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    !_.isEmpty(userInfo) && handleSelectUser();
    // eslint-disable-next-line
  }, [userInfo]);

  // 사용자 상세정보 조회
  const handleSelectUser = async () => {
    try {
      setIsLoading(true);
      const { data: user } = await api.selectUser({
        path: { user_id: userInfo.id },
      });
      setUserDetail(user);
    } catch (error) {
      message.error(
        error.response ? `${error.response.data.code}, ${error.response.data.message}` : "사용자 조회 실패"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 닫기
  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      wrapClassName="user-attendance-modal-wrap"
      title=""
      open={visible}
      onCancel={handleCancel}
      footer={false}
      maskClosable={false}
      getContainer={document.getElementById("userAttendanceModal")}
      destroyOnClose
    >
      <Row className="user-attendance-modal-title">
        <Col span={24}>
          <Image width={300} height={160} src={title} preview={false} />
        </Col>
      </Row>
      <Row className="user-attendance-modal-info">
        <Col span={24}>
          <Text className="user-name">{userDetail.name}</Text> <Text>님의 출석판입니다.</Text>
        </Col>
      </Row>
      <Row className="user-attendance-modal-attendance">
        <Col span={24}>
          <Row>
            {!_.isEmpty(userDetail) &&
              _.map(userDetail.attendance.daylist, (item, index) => {
                if (index < 6) {
                  return (
                    <Col span={4} className="stamp-col" key={index}>
                      <Stamp
                        index={index}
                        attendanceYn={item[`day${Number(index) + 1}`]}
                        attendanceId={userDetail.attendance.id}
                        onSelectUser={handleSelectUser}
                        setIsLoading={setIsLoading}
                        today={today}
                        hour={hour}
                      />
                    </Col>
                  );
                } else {
                  return "";
                }
              })}
          </Row>
          <Divider />
          <Row>
            {!_.isEmpty(userDetail) &&
              _.map(userDetail.attendance.daylist, (item, index) => {
                if (5 < index && index < 12) {
                  return (
                    <Col span={4} className="stamp-col" key={index}>
                      <Stamp
                        index={index}
                        attendanceYn={item[`day${Number(index) + 1}`]}
                        attendanceId={userDetail.attendance.id}
                        onSelectUser={handleSelectUser}
                        setIsLoading={setIsLoading}
                        today={today}
                        hour={hour}
                      />
                    </Col>
                  );
                } else {
                  return "";
                }
              })}
          </Row>
        </Col>
      </Row>
      <Row className="user-attendance-modal-attendance-footer">
        <Col span={24}>
          <Row>
            <Col span={24}>※ 금일자 도장을 누르시면 출석이 완료됩니다.</Col>
          </Row>
          <Row>
            <Col span={24}>※ 출석은 당일 오전8시까지만 가능합니다.</Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default UserAttendanceModal;
