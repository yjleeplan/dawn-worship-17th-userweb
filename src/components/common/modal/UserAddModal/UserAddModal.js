import React from 'react';
import { Modal, Form, Input, Select, message } from 'antd';

const UserAddModal = ({ visible, onCancel }) => {
    // Form Init
    const initialValues = {
        name : '',
        birth: '',
        dept: null,
    };

    // 소속 리스트
    const deptOptions = [
        {label: '믿음1 (양지동)', value: '믿음1 (양지동)'},
        {label: '믿음2 (단대동,산성동)', value: '믿음2 (단대동,산성동)'},
        {label: '믿음3 (신흥동,수진동,태평동)', value: '믿음3 (신흥동,수진동,태평동)'},
        {label: '소망1 (은행동)', value: '소망1 (은행동)'},
        {label: '소망2 (금광2동)', value: '소망2 (금광2동)'},
        {label: '소망3 (금광1동,상대원동,중앙동)', value: '소망3 (금광1동,상대원동,중앙동)'},
        {label: '소망4 (성남동,하대원동,도촌동)', value: '소망4 (성남동,하대원동,도촌동)'},
        {label: '사랑1 (분당구)', value: '사랑1 (분당구)'},
        {label: '사랑2 (광주시)', value: '사랑2 (광주시)'},
        {label: '사랑3 (용인시)', value: '사랑3 (용인시)'},
        {label: '사랑4 (서울/경기외곽)', value: '사랑4 (서울/경기외곽)'},
        {label: '신혼부부', value: '신혼부부'},
        {label: '청년부', value: '청년부'},
        {label: '고등부', value: '고등부'},
        {label: '중등부', value: '중등부'},
        {label: '초등부', value: '초등부'},
        {label: '유년부', value: '유년부'},
        {label: '유치부', value: '유치부'},
        {label: '영아부', value: '영아부'},
    ];

    /** Hook */
    const [form] = Form.useForm();

    // 닫기
    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    // 등록
    const handleSave = () => {
        form.submit();
    };

    // Form Submit
    const onFinish = (values) => {
        Modal.confirm({
            title: '등록 확인',
            content: '등록하시겠습니까?',
            onOk: () => {
                console.log(values);
                message.success('정상적으로 등록되었습니다')
                handleCancel();
            },
        });
    };

    return (
        <Modal
            title='사용자 등록'
            visible={visible}
            onOk={handleSave}
            onCancel={handleCancel}
            okText='등록'
            cancelText='닫기'
            maskClosable={false}
            destroyOnClose>
        	 <Form
                form={form}
                name="form"
                initialValues={initialValues}
                onFinish={onFinish}
                labelCol={{ span: 4 }}>
                <Form.Item label='성명' required>
                    <Form.Item
                        name='name'
                        rules={[
                            {
                                required: true,
                                message: '성명을 입력해주세요',
                            },
                        ]}>
                        <Input placeholder='성명을 입력해주세요' />
                    </Form.Item>
                </Form.Item>
                <Form.Item label='생년월일' required>
                    <Form.Item
                        name='birth'
                        rules={[
                            {
                                required: true,
                                message: '생년월일을 선택해주세요',
                              },
                        ]}>
                        <Input placeholder='생년월일을 입력해주세요' />
                    </Form.Item>
                </Form.Item>
                <Form.Item label='소속' required>
                    <Form.Item
                        name='dept'
                        rules={[
                            {
                                required: true,
                                message: '소속을 선택해주세요',
                              },
                        ]}>
                        <Select placeholder='소속을 선택해주세요' options={deptOptions} />
                    </Form.Item>
                </Form.Item>
            </Form>
      	</Modal>
    );
};

export default UserAddModal;