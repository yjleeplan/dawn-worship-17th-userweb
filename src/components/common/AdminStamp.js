import { Image, message, Modal } from "antd";
import React from "react";
import * as api from "../../api";
import { IS_COMPLETE } from "../../context/Context";

const AdminStamp = ({
  index,
  attendanceYn,
  attendanceId,
  onSelectUser,
  setIsLoading,
  today,
  hour,
}) => {
  // 금일자 컬럼 Formatter
  const indexFormatter = (index) => {
    return {
      0: "DAY1",
      1: "DAY2",
      2: "DAY3",
      3: "DAY4",
      4: "DAY5",
      5: "DAY6",
      6: "DAY7",
      7: "DAY8",
      8: "DAY9",
      9: "DAY10",
      10: "DAY11",
      11: "DAY12",
    }[index];
  };

  // 스탬프 Formatter
  const stampFormatter = (value) => {
    return {
      DAY1: "https://dawn-worship-17th-images.s3.ap-northeast-2.amazonaws.com/btn_1.png",
      DAY2: "https://dawn-worship-17th-images.s3.ap-northeast-2.amazonaws.com/btn_2.png",
      DAY3: "https://dawn-worship-17th-images.s3.ap-northeast-2.amazonaws.com/btn_3.png",
      DAY4: "https://dawn-worship-17th-images.s3.ap-northeast-2.amazonaws.com/btn_4.png",
      DAY5: "https://dawn-worship-17th-images.s3.ap-northeast-2.amazonaws.com/btn_5.png",
      DAY6: "https://dawn-worship-17th-images.s3.ap-northeast-2.amazonaws.com/btn_6.png",
      DAY7: "https://dawn-worship-17th-images.s3.ap-northeast-2.amazonaws.com/btn_7.png",
      DAY8: "https://dawn-worship-17th-images.s3.ap-northeast-2.amazonaws.com/btn_8.png",
      DAY9: "https://dawn-worship-17th-images.s3.ap-northeast-2.amazonaws.com/btn_9.png",
      DAY10:
        "https://dawn-worship-17th-images.s3.ap-northeast-2.amazonaws.com/btn_10.png",
      DAY11:
        "https://dawn-worship-17th-images.s3.ap-northeast-2.amazonaws.com/btn_11.png",
      DAY12:
        "https://dawn-worship-17th-images.s3.ap-northeast-2.amazonaws.com/btn_12.png",
      COMPLETE:
        "https://dawn-worship-17th-images.s3.ap-northeast-2.amazonaws.com/btn_complete.png",
      BONUS:
        "https://dawn-worship-17th-images.s3.ap-northeast-2.amazonaws.com/btn_bonus.png",
      SOON: "https://dawn-worship-17th-images.s3.ap-northeast-2.amazonaws.com/btn_soon.png",
    }[value];
  };

  // 스탬프 타입
  const stampType = () => {
    let type = IS_COMPLETE(attendanceYn);
    if (!type) {
      type = indexFormatter(index);
    }

    return type;
  };

  // 스탬프 이미지 소스
  const stampSource = () => {
    const type = stampType();

    return stampFormatter(type);
  };

  // 출석
  const handleUpdatedAttendance = () => {
    Modal.confirm({
      title: `${index + 1}일차`,
      content:
        attendanceYn === "N"
          ? "출석 처리하시겠습니까?"
          : "결석 처리하시겠습니까?",
      okText: "확인",
      cancelText: "취소",
      onOk: async () => {
        try {
          setIsLoading(true);

          const value = attendanceYn === "N" ? "Y" : "N";

          await api.updatedAttendance({
            path: { attendance_id: attendanceId },
            data: { [`day${Number(index) + 1}`]: value },
          });

          onSelectUser();
        } catch (error) {
          message.error(
            error.response ? `${error.response.data.message}` : "출석 실패"
          );
        } finally {
          setIsLoading(false);
        }
      },
    });
  };

  return (
    <div>
      <Image
        wrapperClassName={attendanceYn !== "N" ? "btnEffect" : ""}
        src={stampSource()}
        preview={false}
        onClick={handleUpdatedAttendance}
      />
      {Number(index) + 1}일차
    </div>
  );
};

export default AdminStamp;
