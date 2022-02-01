import React from 'react';
import {SearchOutlined} from '@ant-design/icons';
import { Form, Input } from 'antd';

const Main = ({history}) => {
    // Form Init
    const initialValues = {
        keyword : ""
    };

    /** Hook */
    const [form] = Form.useForm();

    // 검색
    const handleSearch = () => {
        form.submit();
    };

    // Form Submit
    const onFinish = (values) => {
        console.log(values);
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
            </Form>
        </>
    );
};

export default Main;