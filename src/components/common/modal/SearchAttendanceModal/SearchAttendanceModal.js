import { SearchOutlined } from "@ant-design/icons";
import { AgGridReact } from "ag-grid-react";
import { Form, Input, message, Modal } from "antd";
import _ from "lodash";
import React, { useState } from "react";
import * as api from "../../../../api";
import GridCellButton from "../../GridCellButton";
import UserAttendanceModal from "../UserAttendanceModal/UserAttendanceModal";

const SearchAttendanceModal = ({ visible, onCancel, setIsLoading }) => {
  // Form Init
  const initialValues = {
    keyword: "",
  };

  // 검색결과 그리드 컬럼 정의
  const columnDefs = [
    {
      headerName: "이름",
      field: "name",
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "소속",
      field: "department",
      cellStyle: { textAlign: "center" },
    },
    {
      field: "",
      cellStyle: { textAlign: "center" },
      cellRendererFramework: GridCellButton,
      cellRendererParams: (params) => ({
        data: params.data,
        onClick: handleCellClicked,
      }),
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
    const totalHeight = headerHeight + 1 + resultList.length * rowHeight;
    return totalHeight > 246 ? 246 : totalHeight;
  };

  // 그리드 셀 클릭
  const handleCellClicked = ({ data }) => {
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
      setIsLoading(true);

      const { data: users } = await api.listUser({
        query: {
          ...(keyword && { name: keyword }),
        },
      });

      if (_.isEmpty(users)) {
        message.warning({
          content: "검색결과 없습니다. 등록 먼저 부탁드립니다.",
          style: {
            marginTop: "280px",
          },
        });
        setResultList([]);
      } else {
        setResultList(users);
      }
    } catch (error) {
      Modal.error({
        title: "검색 실패",
        content: error.response ? `${error.response.data.code}, ${error.response.data.message}` : error.message,
        okText: "확인",
      });
    } finally {
      setIsLoading(false);
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

  // 닫기
  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      wrapClassName="search-attendance-modal-wrap"
      title="출석 체크"
      open={visible}
      onCancel={handleCancel}
      footer={false}
      maskClosable={false}
      getContainer={document.getElementById("searchAttendanceModal")}
      destroyOnClose
    >
      <Form form={form} name="form" initialValues={initialValues} onFinish={onFinish}>
        <div className="search-wrap">
          <Form.Item name="keyword">
            <Input placeholder="이름을 입력해주세요" suffix={<SearchOutlined onClick={handleSearch} />} />
          </Form.Item>
        </div>
        <div className="grid-wrap">
          {!_.isEmpty(resultList) && (
            <div className="ag-theme-alpine" style={{ height: getAgGridHeight() }}>
              <AgGridReact
                columnDefs={columnDefs}
                rowData={resultList}
                rowHeight={rowHeight}
                headerHeight={headerHeight}
                suppressMovableColumns={true}
                onGridReady={(params) => params.api.sizeColumnsToFit()}
              />
            </div>
          )}
        </div>
        <div id="userAttendanceModal">
          <UserAttendanceModal
            visible={userAttendanceModalVisible}
            onCancel={handleUserAttendanceModalClose}
            userInfo={selectedRowData}
            setIsLoading={setIsLoading}
          />
        </div>
      </Form>
    </Modal>
  );
};

export default SearchAttendanceModal;
