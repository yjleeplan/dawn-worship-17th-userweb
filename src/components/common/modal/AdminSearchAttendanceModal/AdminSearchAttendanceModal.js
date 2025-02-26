import { SearchOutlined } from "@ant-design/icons";
import { AgGridReact } from "ag-grid-react";
import { Col, Form, Image, Input, message, Modal, Row, Select, Tag } from "antd";
import _ from "lodash";
import moment from "moment";
import React, { useState } from "react";
import * as xlsx from "xlsx";
import * as api from "../../../../api";
import excelBtn from "../../../../assets/images/btn_excel.png";
import { addComma } from "../../../../lib/addComma";
import GridCellButton from "../../GridCellButton";
import AdminUserAttendanceModal from "../AdminUserAttendanceModal/AdminUserAttendanceModal";

const AdminSearchAttendanceModal = ({ visible, onCancel, setIsLoading }) => {
  // Form Init
  const initialValues = {
    department: null,
    keyword: "",
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
  //   const gridRef = useRef();

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
  const onFinish = async ({ keyword, department }) => {
    try {
      setIsLoading(true);

      const { data: users } = await api.listUser({
        query: {
          ...(keyword && { name: keyword }),
          ...(department && { department }),
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

  // Excel Download
  const handleExcelDownload = async () => {
    try {
      setIsLoading(true);

      const { department, keyword } = form.getFieldsValue();
      const { data: users } = await api.listUserForExcel({
        query: {
          ...(keyword && { name: keyword }),
          ...(department && { department }),
        },
      });
      const excelDatas = _.map(users, (user) => {
        return {
          부서: user.department,
          이름: user.name,
          ..._.omit(user, ["department", "name"]),
        };
      });
      const worksheet = xlsx.utils.json_to_sheet(excelDatas);
      const workbook = xlsx.utils.book_new();
      const departmentValue = department ? department : "전체";
      const fileName = `온라인_출석명단_${departmentValue}_${moment().format("YYYYMMDDHHmm")}.xlsx`;

      xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      xlsx.writeFile(workbook, fileName);
    } catch (error) {
      Modal.error({
        title: "엑셀 다운로드 실패",
        content: error.response ? `${error.response.data.code}, ${error.response.data.message}` : error.message,
        okText: "확인",
      });
    } finally {
      setIsLoading(false);
    }
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
        <div className="admin-search-wrap">
          <Row>
            <Col span={11}>
              <Form.Item name="department">
                <Select placeholder="소속" options={deptOptions} size="large" />
              </Form.Item>
            </Col>
            <Col span={12} offset={1}>
              <Form.Item name="keyword">
                <Input size="large" placeholder="이름" suffix={<SearchOutlined onClick={handleSearch} />} />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className="admin-grid-wrap">
          {!_.isEmpty(resultList) && (
            <>
              <Row className="grid-info-wrap">
                <Col span={12} className="total-cnt-wrap">
                  총 {addComma(resultList.length)}명
                </Col>
                <Col span={12} className="excel-btn-wrap">
                  <Tag onClick={handleExcelDownload}>
                    <Image width={25} height={25} src={excelBtn} preview={false} />
                    다운로드
                  </Tag>
                </Col>
              </Row>
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
              {/* <div>
                <AgGridReact
                  ref={gridRef}
                  columnDefs={columnDefs}
                  rowData={resultList}
                />
              </div> */}
            </>
          )}
        </div>
        <div id="userAttendanceModal">
          <AdminUserAttendanceModal
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

export default AdminSearchAttendanceModal;
