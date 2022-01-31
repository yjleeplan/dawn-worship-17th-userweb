import React from 'react';
import {SearchOutlined} from '@ant-design/icons';
import { Input } from 'antd';

const Main = ({history}) => {
    return (
        <>
            <div className='search-wrap'>
                <Input placeholder='이름을 입력해주세요.' suffix={<SearchOutlined />}/>
            </div>
        </>
    );
};

export default Main;