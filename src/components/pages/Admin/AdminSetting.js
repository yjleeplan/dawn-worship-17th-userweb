import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Select } from "antd";
import React, { useState } from "react";

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
  const [selectedKey, setSelectedKey] = useState();
  const [point, setPoint] = useState(115);

  const plus = () => {
    setPoint((prev) => prev + 1);
  };

  const minus = () => {
    setPoint((prev) => prev - 1);
  };

  return (
    <div id="admin-setting-wrap">
      <div id="admin-select-wrap">
        <Select
          placeholder="소속을 선택해주세요"
          options={deptOptions}
          size="large"
          getPopupContainer={() => document.getElementById("admin-select-wrap")}
          onSelect={(key) => setSelectedKey(key)}
        />
      </div>
      {selectedKey && (
        <>
          <div className="point-wrap">{point}</div>
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
