import React, { useState } from 'react';
import {SearchOutlined} from '@ant-design/icons';
import { Form, Input } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import _ from 'lodash';

const Main = ({history}) => {
    // Form Init
    const initialValues = {
        keyword : ""
    };

    // Sample Data
    const sampleData = [
        { name : '박상록', birth: '1994-06-15', dept: '믿음1' },
        { name : '박상록', birth: '2000-01-22', dept: '청년부' },
        { name : '박도영', birth: '1973-08-03', dept: '소망2' },
        { name : '박성훈', birth: '1949-11-09', dept: '사랑4' },
        // { name : '박성훈', birth: '1949-11-09', dept: '사랑4' },
        // { name : '박성훈', birth: '1949-11-09', dept: '사랑4' },
        // { name : '박성훈', birth: '1949-11-09', dept: '사랑4' },
        // { name : '박성훈', birth: '1949-11-09', dept: '사랑4' },
    ];

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
            field: 'birth',
            width: 120,
            cellStyle: { textAlign: 'center' }
        },
        {
            headerName : '소속',
            field: 'dept',
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
    // const [selectedRowData, setSelectedRowData] = useState({});

    // 검색결과 그리드 Height
    const getAgGridHeight = () => {
        const totalHeight = (headerHeight + 1) + (resultList.length * rowHeight);
        return totalHeight > 320 ? 320 : totalHeight;
    };

    // 그리드 셀 클릭
    const handleCellClicked = ({data}) => {
        // setSelectedRowData(data);
    };

    // 검색
    const handleSearch = () => {
        form.submit();
    };

    // Form Submit
    const onFinish = (values) => {
        setResultList(sampleData);
    };

    return (
        <>
            <Form
                form={form}
                name="form"
                initialValues={initialValues}
                onFinish={onFinish}>
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
                                onCellClicked={handleCellClicked} />
                        </div>
                    }
                </div>
            </Form>
        </>
    );
};

export default Main;