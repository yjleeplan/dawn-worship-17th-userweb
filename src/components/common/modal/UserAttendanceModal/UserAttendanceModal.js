import { Col, Divider, Image, message, Modal, Row, Typography } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import * as api from '../../../../api';
import title from '../../../../assets/images/title.png';
import Stamp from '../../Stamp';

const { Text } = Typography;

const UserAttendanceModal = ({ visible, onCancel, userInfo }) => {
    /** State */
    const [userDetail, setUserDetail] = useState([]);

    /** Effect */
    useEffect(() => {
        !_.isEmpty(userInfo) && handleSelectUser();
    }, [userInfo]);

    // 사용자 상세정보 조회
    const handleSelectUser = async () => {
        try {
            const { data: user } = await api.selectUser({
                path: { user_id: userInfo.id },
            });
            setUserDetail(user);
        } catch (error) {
            message.error(error.response ? `${error.response.data.code}, ${error.response.data.message}` : "사용자 조회 실패");
        }
    }
    
    // 닫기
    const handleCancel = () => {
        onCancel();
    };

    return (
        <Modal
            wrapClassName='user-attendance-modal-wrap'
            title=''
            visible={visible}
            onCancel={handleCancel}
            footer={false}
            maskClosable={false}
            destroyOnClose>
            <Row className='user-attendance-modal-title'>
                <Col span={24}>
                    <Image width={192} height={160} src={title} preview={false} />
                </Col>
            </Row>
            <Row className='user-attendance-modal-info'>
                <Col span={24}>
                    <Text className='user-name'>{userDetail.name}</Text> <Text>성도님의 출석판입니다.</Text>
                </Col>
            </Row>
            <Row className='user-attendance-modal-attendance'>
                <Col span={24}>
                    <Row>
                        {!_.isEmpty(userDetail) && _.map(userDetail.attendance.daylist, (item, index) => {
                            if (index < 6) {
                                return (
                                    <Col span={4} className='stamp-col' key={index}>
                                        <Stamp
                                            data={item[`day${Number(index) + 1}`]}
                                            index={index}
                                            attendanceId={userDetail.attendance.id}
                                            onSelectUser={handleSelectUser}
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
                        {!_.isEmpty(userDetail) && _.map(userDetail.attendance.daylist, (item, index) => {
                            if (index > 5) {
                                return (
                                    <Col span={4} className='stamp-col' key={index}>
                                        <Stamp
                                            data={item[`day${index + 1}`]}
                                            index={index}
                                            attendanceId={userDetail.attendance.id}
                                            onSelectUser={handleSelectUser}
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
            <Row className='user-attendance-modal-attendance-footer'>
                <Col span={24}>
                    <Row>
                        <Col span={24}>
                            ※ 금일자 도장을 누르시면 출석이 완료됩니다.
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            ※ 출석은 당일에만 가능합니다.
                        </Col>
                    </Row>
                </Col>
            </Row>
      	</Modal>
    );
};

export default UserAttendanceModal;