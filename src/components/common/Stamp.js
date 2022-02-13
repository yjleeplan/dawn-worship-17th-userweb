import { Image, message } from "antd";
import moment from "moment";
import React from "react";
import * as api from "../../api";
import btn1 from "../../assets/images/btn_1.png";
import btn10 from "../../assets/images/btn_10.png";
import btn11 from "../../assets/images/btn_11.png";
import btn12 from "../../assets/images/btn_12.png";
import btn2 from "../../assets/images/btn_2.png";
import btn3 from "../../assets/images/btn_3.png";
import btn4 from "../../assets/images/btn_4.png";
import btn5 from "../../assets/images/btn_5.png";
import btn6 from "../../assets/images/btn_6.png";
import btn7 from "../../assets/images/btn_7.png";
import btn8 from "../../assets/images/btn_8.png";
import btn9 from "../../assets/images/btn_9.png";
import complete from "../../assets/images/btn_complete.png";
import soon from "../../assets/images/btn_soon.png";

const Stamp = ({
  index,
  attendanceYn,
  attendanceId,
  onSelectUser,
  setIsLoading,
  today,
}) => {
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

  const getStamp = () => {
    switch (index) {
      case 0:
        return attendanceYn === "Y" ? complete : today === 14 ? btn1 : soon;
      case 1:
        return attendanceYn === "Y" ? complete : today === 15 ? btn2 : soon;
      case 2:
        return attendanceYn === "Y" ? complete : today === 16 ? btn3 : soon;
      case 3:
        return attendanceYn === "Y" ? complete : today === 17 ? btn4 : soon;
      case 4:
        return attendanceYn === "Y" ? complete : today === 18 ? btn5 : soon;
      case 5:
        return attendanceYn === "Y" ? complete : today === 19 ? btn6 : soon;
      case 6:
        return attendanceYn === "Y" ? complete : today === 21 ? btn7 : soon;
      case 7:
        return attendanceYn === "Y" ? complete : today === 22 ? btn8 : soon;
      case 8:
        return attendanceYn === "Y" ? complete : today === 23 ? btn9 : soon;
      case 9:
        return attendanceYn === "Y" ? complete : today === 24 ? btn10 : soon;
      case 10:
        return attendanceYn === "Y" ? complete : today === 25 ? btn11 : soon;
      case 11:
        return attendanceYn === "Y" ? complete : today === 26 ? btn12 : soon;

      default:
        return false;
    }
  };

  // 출석
  const handleUpdatedAttendance = async () => {
    const currentHour = moment().hour();
    if (todayFormatter(today) === `day${Number(index) + 1}`) {
      if (3 < currentHour && currentHour < 8) {
        try {
          setIsLoading(true);
          await api.updatedAttendance({
            path: { attendance_id: attendanceId },
            data: { [`day${Number(index) + 1}`]: "Y" },
          });
          onSelectUser();
        } catch (error) {
          message.error(
            error.response
              ? `${error.response.data.code}, ${error.response.data.message}`
              : "출석 실패"
          );
        } finally {
          setIsLoading(false);
        }
      } else {
        message.warning("출석은 04:00 ~ 08:00 사이에만 가능합니다.");
      }
    }
  };

  return (
    <div>
      <Image
        wrapperClassName={attendanceYn === "Y" ? "btnEffect" : ""}
        src={getStamp()}
        preview={false}
        onClick={handleUpdatedAttendance}
      />
      {Number(index) + 1}일차
    </div>
  );
};

export default Stamp;
