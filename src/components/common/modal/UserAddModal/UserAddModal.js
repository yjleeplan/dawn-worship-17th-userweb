import { Form, Input, message, Modal, Select } from 'antd';
import _ from 'lodash';
import React from 'react';
import * as api from '../../../../api';

const UserAddModal = ({ visible, onCancel }) => {
    // Form Init
    const initialValues = {
        name: '',
        year: '',
        month: '',
        day: '',
        department: null,
    };

    // 소속 리스트
    const deptOptions = [
        {label: '믿음1', value: '믿음1'},
        {label: '믿음2', value: '믿음2'},
        {label: '믿음3', value: '믿음3'},
        {label: '소망1', value: '소망1'},
        {label: '소망2', value: '소망2'},
        {label: '소망3', value: '소망3'},
        {label: '소망4', value: '소망4'},
        {label: '사랑1', value: '사랑1'},
        {label: '사랑2', value: '사랑2'},
        {label: '사랑3', value: '사랑3'},
        {label: '사랑4', value: '사랑4'},
        {label: '신혼부부', value: '신혼부부'},
        {label: '에하드', value: '에하드'},
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

    // 년도 validate
    const validateYear = (obj, value) => {
        const regex = /^[0-9]+$/;
        if (!regex.test(value)) return Promise.reject(new Error('년도는 숫자만 입력 가능합니다.'));
        if (_.isEmpty(value)) return Promise.reject(new Error('년도를 입력해주세요.'));
        if (value < 1900 || value > 2022) return Promise.reject(new Error('년도는 1900~2022까지 입력 가능합니다.'));
    };

    // 월 validate
    const validateMonth = (obj, value) => {
        const regex = /^[0-9]+$/;
        if (!regex.test(value)) return Promise.reject(new Error('년도는 숫자만 입력 가능합니다.'));
        if (_.isEmpty(value)) return Promise.reject(new Error('월을 입력해주세요.'));
        if (parseInt(value) < 0 || parseInt(value) > 12) return Promise.reject(new Error('월은 0~12까지 입력 가능합니다.'));
    };

    // 일 validate
    const validateDay = (obj, value) => {
        const regex = /^[0-9]+$/;
        if (!regex.test(value)) return Promise.reject(new Error('년도는 숫자만 입력 가능합니다.'));
        if (_.isEmpty(value)) return Promise.reject(new Error('일을 입력해주세요.'));
        if (parseInt(value) < 0 || parseInt(value) > 31) return Promise.reject(new Error('일은 0~31까지 입력 가능합니다.'));
    };

    // Form Submit
    const onFinish = (values) => {
        const params = {
            name : values.name,
            birthday : `${values.year}-${values.month}-${values.day}`,
            department : values.department
        }
        
        Modal.confirm({
            title: '등록 확인',
            content: '등록하시겠습니까?',
            okText: '확인',
            cancelText: '취소',
            onOk: async () => {
                try {
                    await api.createUser({
                        data: params,
                    });

                    message.success('정상적으로 등록되었습니다');
                    handleCancel();
                } catch (error) {
                    message.error(error.response ? `${error.response.data.code}, ${error.response.data.message}` : "등록 실패");
                }
            },
        });
    };

    return (
        <Modal
            wrapClassName='user-add-modal-wrap'
            title='출석 명단 등록'
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
                <Form.Item label='이름' required className='form-item-wrap'>
                    <Form.Item
                        name='name'
                        rules={[
                            {
                                required: true,
                                message: '이름을 입력해주세요',
                            },
                        ]}>
                        <Input placeholder='이름을 입력해주세요' />
                    </Form.Item>
                </Form.Item>
                <Form.Item label='생년월일' required className='form-item-wrap'>
                    <Input.Group compact>
                        <Form.Item
                            name='year'
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    validator: validateYear,
                                },
                            ]}>
                            <Input type='tel' maxLength={4} style={{ width: "40%", textAlign: 'center' }} placeholder="YYYY" suffix="년" />
                        </Form.Item>
                        <Form.Item
                            name='month'
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    validator: validateMonth,
                                },
                            ]}>
                            <Input type='tel' maxLength={2} style={{ width: "30%", textAlign: 'center' }} placeholder="MM" suffix="월" />
                        </Form.Item>
                        <Form.Item
                            name='day'
                            noStyle
                            rules={[
                                {
                                    required: true,
                                    validator: validateDay,
                                },
                            ]}>
                            <Input type='tel' maxLength={2} style={{ width: "30%", textAlign: 'center' }} placeholder="DD" suffix="일" />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
                <Form.Item label='소속' required className='form-item-wrap'>
                    <Form.Item
                        name='department'
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