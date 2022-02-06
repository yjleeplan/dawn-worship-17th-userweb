import { SearchOutlined } from '@ant-design/icons';
import { AgGridReact } from 'ag-grid-react';
import { Col, Form, Image, Input, Modal, Row } from 'antd';
import _ from 'lodash';
import React, { useState } from 'react';
import * as api from '../../../api';
import title from '../../../assets/images/title.png';
import UserAttendanceModal from '../../common/modal/UserAttendanceModal/UserAttendanceModal';

const Main = ({history}) => {
    // Form Init
    const initialValues = {
        keyword : ""
    };

    // 검색결과 그리드 컬럼 정의
    const columnDefs = [
        {
            headerName : '이름',
            field: 'name',
            width: 90,
            cellStyle: { textAlign: 'center' }
        },
        { 
            headerName : '생년월일',
            field: 'birthday',
            width: 120,
            cellStyle: { textAlign: 'center' }
        },
        {
            headerName : '소속',
            field: 'department',
            width: 90,
            cellStyle: { textAlign: 'center' }
        },
    ];

    // 검색결과 그리드 Row Height
    const rowHeight = 37;

    // 검색결과 그리드 Header Height
    const headerHeight = 40;

    /** Hook */
    const [form] = Form.useForm();

    /** State */
    const [resultList, setResultList] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState({});
    const [userAttendanceModalVisible, setUserAttendanceModalVisible] = useState(false);

    // 검색결과 그리드 Height
    const getAgGridHeight = () => {
        const totalHeight = (headerHeight + 1) + (resultList.length * rowHeight);
        return totalHeight > 246 ? 246 : totalHeight;
    };

    // 그리드 셀 클릭
    const handleCellClicked = ({data}) => {
        setSelectedRowData(data);
        handleUserAttendanceModalOpen();
    };

    // 검색
    const handleSearch = () => {
        form.submit();
    };

    // Form Submit
    const onFinish = async ({ keyword }) => {
        try {
            const { data: users } = await api.listUser({
                query: {
                    ...keyword && { name: keyword },
                },
            });
            setResultList(users);
        } catch (error) {
            Modal.error({
                title: '검색 실패',
                content: error.response ? `${error.response.data.code}, ${error.response.data.message}` : error.message,
                okText: '확인',
            });
        }
    };

    // 사용자 출석체크 모달 오픈
	const handleUserAttendanceModalOpen = () => {
		setUserAttendanceModalVisible(true);
	};

	// 사용자 출석체크 모달 닫기
	const handleUserAttendanceModalClose = () => {
		setUserAttendanceModalVisible(false);
	};

    return (
        <>
            <Form
                form={form}
                name="form"
                initialValues={initialValues}
                onFinish={onFinish}>
                <Row className='user-attendance-modal-title'>
                    <Col span={24}>
                        <Image width={192} height={160} src={title} preview={false} />
                    </Col>
                </Row>
                <div className='search-wrap'>
                    <Form.Item name='keyword'>
                        <Input placeholder='이름을 입력해주세요' suffix={<SearchOutlined onClick={handleSearch} />} />
                    </Form.Item>
                </div>
                <div className='grid-wrap'>
                    {!_.isEmpty(resultList) &&
                        <div className="ag-theme-alpine" style={{ height: getAgGridHeight() }}>
                            <AgGridReact
                                columnDefs={columnDefs}
                                rowData={resultList}
                                rowHeight={rowHeight}
                                headerHeight={headerHeight}
                                suppressMovableColumns={true}
                                onCellClicked={handleCellClicked} />
                        </div>
                    }
                </div>
            </Form>

            <UserAttendanceModal
                visible={userAttendanceModalVisible}
                onCancel={handleUserAttendanceModalClose}
                userInfo={selectedRowData}
            />
        </>
    );
};

export default Main;