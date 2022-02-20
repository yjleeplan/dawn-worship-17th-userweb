import { Image, message } from "antd";
import _ from "lodash";
import React from "react";
import * as api from "../../api";
import {
  ATTENDANCE_END_HOUR,
  ATTENDANCE_START_HOUR,
  BONUS_DAYS,
  BONUS_END_HOUR,
  BONUS_START_HOUR,
  IS_BONUS,
  IS_COMPLETE,
  IS_NOT_COMPLETE,
} from "../../context/Context";

const Stamp = ({
  index,
  attendanceYn,
  attendanceId,
  onSelectUser,
  setIsLoading,
  today,
  hour,
}) => {
  // 금일자 컬럼 Formatter
  const todayFormatter = (today) => {
    return {
      14: "day1",
      15: "day2",
      16: "day3",
      17: "day4",
      18: "day5",
      19: "day6",
      21: "day7",
      22: "day8",
      23: "day9",
      24: "day10",
      25: "day11",
      26: "day12",
    }[today];
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
      if (
        _.includes(BONUS_DAYS, today) &&
        BONUS_START_HOUR <= hour &&
        hour < BONUS_END_HOUR
      ) {
        type = IS_BONUS(index, today);
      } else {
        type = IS_NOT_COMPLETE(index, today);
      }
    }

    return type;
  };

  // 스탬프 이미지 소스
  const stampSource = () => {
    const type = stampType();

    return stampFormatter(type);
  };

  // 출석 체크 가능 여부
  const isUpdateEnable = () => {
    const type = stampType();
    let result = true;

    if (type === "COMPLETE" || type === "BONUS" || type === "SOON") {
      result = false;
    }

    return result;
  };

  // 출석
  const handleUpdatedAttendance = async () => {
    try {
      if (isUpdateEnable()) {
        if (
          _.includes(BONUS_DAYS, today) &&
          BONUS_START_HOUR <= hour &&
          hour < BONUS_END_HOUR
        ) {
          setIsLoading(true);

          await api.updatedAttendance({
            path: { attendance_id: attendanceId },
            data: { [`day${Number(index) + 1}`]: "B" },
          });

          onSelectUser();
        } else {
          if (todayFormatter(today) === `day${Number(index) + 1}`) {
            if (ATTENDANCE_START_HOUR <= hour && hour < ATTENDANCE_END_HOUR) {
              setIsLoading(true);

              await api.updatedAttendance({
                path: { attendance_id: attendanceId },
                data: { [`day${Number(index) + 1}`]: "Y" },
              });

              onSelectUser();
            } else {
              message.warning("출석은 04:00 ~ 08:00 사이에만 가능합니다.");
            }
          }
        }
      }
    } catch (error) {
      message.error(
        error.response ? `${error.response.data.message}` : "출석 실패"
      );
    } finally {
      setIsLoading(false);
    }
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

export default Stamp;
