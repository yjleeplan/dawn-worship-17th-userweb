import { Button } from "antd";
import React from "react";

const GridCellButton = ({ data, onClick }) => {
  return (
    <Button
      type="primary"
      size="small"
      className="grid-cell-button"
      onClick={() => onClick({ data })}
    >
      출석체크
    </Button>
  );
};

export default GridCellButton;
