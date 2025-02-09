import { Form, Input, message, Modal, Select } from "antd";
import React from "react";
import * as api from "../../../../api";

const UserAddModal = ({ visible, onCancel, setIsLoading }) => {
  // Form Init
  const initialValues = {
    name: "",
    year: "",
    month: "",
    day: "",
    department: null,
  };

  // 소속 리스트
  const deptOptions = [
    { label: "소담마을", value: "소담마을" },
    { label: "도담마을", value: "도담마을" },
    { label: "어울림마을", value: "어울림마을" },
    { label: "울림마을", value: "울림마을" },
    { label: "이음마을", value: "이음마을" },
    { label: "에하드", value: "에하드" },
    { label: "세붐마을", value: "세붐마을" },
    { label: "새움청년부", value: "새움청년부" },
    { label: "주일학교", value: "주일학교" },
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
    const params = {
      name: values.name,
      // birthday : `${values.year}-${values.month}-${values.day}`,
      department: values.department,
    };

    Modal.confirm({
      title: "등록 확인",
      content: "등록하시겠습니까?",
      okText: "확인",
      cancelText: "취소",
      onOk: async () => {
        try {
          setIsLoading(true);
          await api.createUser({
            data: params,
          });

          message.success("정상적으로 등록되었습니다");
          handleCancel();
        } catch (error) {
          message.error(error.response ? `${error.response.data.code}, ${error.response.data.message}` : "등록 실패");
        } finally {
          setIsLoading(false);
        }
      },
    });
  };

  return (
    <Modal
      wrapClassName="user-add-modal-wrap"
      title="출석 명단 등록"
      open={visible}
      onOk={handleSave}
      onCancel={handleCancel}
      okText="등록"
      cancelText="닫기"
      getContainer={document.getElementById("userAddModal")}
      maskClosable={false}
      destroyOnClose
    >
      <Form form={form} name="form" initialValues={initialValues} onFinish={onFinish} labelCol={{ span: 4 }}>
        <Form.Item label="이름" required className="form-item-wrap">
          <Form.Item
            className="form-item-inner-wrap"
            name="name"
            rules={[
              {
                required: true,
                message: "이름을 입력해주세요",
              },
            ]}
          >
            <Input placeholder="이름을 입력해주세요" size="large" />
          </Form.Item>
        </Form.Item>
        <Form.Item label="소속" required className="form-item-wrap">
          <Form.Item
            name="department"
            rules={[
              {
                required: true,
                message: "소속을 선택해주세요",
              },
            ]}
          >
            <Select placeholder="소속을 선택해주세요" options={deptOptions} size="large" />
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserAddModal;
