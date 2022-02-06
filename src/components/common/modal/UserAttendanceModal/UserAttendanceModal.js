import { Col, Divider, Image, Modal, Row, Typography } from 'antd';
import React from 'react';
import btn5 from '../../../../assets/images/btn_5.png';
import complete from '../../../../assets/images/btn_complete.png';
import soon from '../../../../assets/images/btn_soon.png';
import title from '../../../../assets/images/title.png';

const { Text } = Typography;

const UserAttendanceModal = ({ visible, onCancel, userInfo }) => {
    /** Hook */
    
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
                    <Text className='user-name'>{userInfo.name}</Text> <Text>성도님의 출석판입니다.</Text>
                </Col>
            </Row>
            <Row className='user-attendance-modal-attendance'>
                <Col span={24}>
                    <Row>
                        <Col span={4} className='stamp-col'>
                            <div>
                                <Image src={complete} preview={false} />
                                1일차
                            </div>
                        </Col>
                        <Col span={4} className='stamp-col'>
                            <div>
                                <Image src={complete} preview={false} />
                                2일차
                            </div>
                        </Col>
                        <Col span={4} className='stamp-col'>
                            <div>
                                <Image src={complete} preview={false} />
                                3일차
                            </div>
                        </Col>
                        <Col span={4} className='stamp-col'>
                            <div>
                                <Image src={complete} preview={false} />
                                4일차
                            </div>
                        </Col>
                        <Col span={4} className='stamp-col'>
                            <div>
                                <Image src={btn5} preview={false} />
                                5일차
                            </div>
                        </Col>
                        <Col span={4} className='stamp-col'>
                            <div>
                                <Image src={soon} preview={false} />
                                6일차
                            </div>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={4} className='stamp-col'>
                            <div>
                                <Image src={soon} preview={false} />
                                7일차
                            </div>
                        </Col>
                        <Col span={4} className='stamp-col'>
                            <div>
                                <Image src={soon} preview={false} />
                                8일차
                            </div>
                        </Col>
                        <Col span={4} className='stamp-col'>
                            <div>
                                <Image src={soon} preview={false} />
                                9일차
                            </div>
                        </Col>
                        <Col span={4} className='stamp-col'>
                            <div>
                                <Image src={soon} preview={false} />
                                10일차
                            </div>
                        </Col>
                        <Col span={4} className='stamp-col'>
                            <div>
                                <Image src={soon} preview={false} />
                                11일차
                            </div>
                        </Col>
                        <Col span={4} className='stamp-col'>
                            <div>
                                <Image src={soon} preview={false} />
                                12일차
                            </div>
                        </Col>
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