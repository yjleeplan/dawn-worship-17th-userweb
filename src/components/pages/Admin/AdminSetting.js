import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Select, message } from "antd";
import React, { useState } from "react";
import * as api from "../../../api";

const Admin = ({ setIsLoading }) => {
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

  /** State */
  const [selectedDepartment, setSelectedDepartment] = useState();

  // 마을별 수기 카운트 조회 API
  const handleListDepartmentCount = async (departmentName) => {
    try {
      setIsLoading(true);
      const { data: departmentData = [] } = await api.listDepartmentCount({
        query: { department: departmentName },
      });
      setSelectedDepartment(departmentData[0]);
    } catch (error) {
      message.error(
        error.response ? `${error.response.data.code}, ${error.response.data.message}` : "마을별 수기 카운트 조회 실패"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 마을별 수기 카운트 변경 API
  const handleUpdateDepartmentCount = async (value) => {
    try {
      setIsLoading(true);

      const { data } = await api.updateDepartmentFreeCount({
        path: { department_id: selectedDepartment?.department_id },
        data: { add_count: Number(value) },
      });

      setSelectedDepartment((prev) => ({ ...prev, attendance_free_count: data?.attendance_free_count }));
    } catch (error) {
      message.error(error.response ? `${error.response.data.message}` : "마을별 수기 카운트 변경 실패");
    } finally {
      setIsLoading(false);
    }
  };

  // - 버튼
  const minus = () => {
    handleUpdateDepartmentCount(-1);
  };

  // + 버튼
  const plus = () => {
    handleUpdateDepartmentCount(1);
  };

  return (
    <div id="admin-setting-wrap">
      <div id="admin-select-wrap">
        <Select
          placeholder="소속을 선택해주세요"
          options={deptOptions}
          size="large"
          getPopupContainer={() => document.getElementById("admin-select-wrap")}
          onSelect={(key) => handleListDepartmentCount(key)}
        />
      </div>
      {selectedDepartment && (
        <>
          <div className="point-wrap">{selectedDepartment?.attendance_free_count?.toLocaleString() ?? 0}</div>
          <div className="button-wrap">
            <div className="button-3d blue" onClick={minus}>
              <MinusOutlined style={{ fontSize: "50px" }} />
            </div>
            <div className="button-3d cyan" onClick={plus}>
              <PlusOutlined style={{ fontSize: "50px" }} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;
