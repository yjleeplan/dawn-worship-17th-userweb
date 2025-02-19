import { Image, message, Progress } from "antd";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import * as api from "../../../api";
import title from "../../../assets/images/title.png";
import Player from "../../common/Player";

// #rank-layout width -> document.getElementById("rank-layout").offsetWidth
// body width -> document.body.offsetWidth

const RankMobile = ({ setIsLoading }) => {
  /** State */
  const [players, setPlayers] = useState([
    { lane: 1, percent: 0, status: "base" },
    { lane: 2, percent: 0, status: "base" },
    { lane: 3, percent: 0, status: "base" },
    { lane: 4, percent: 0, status: "base" },
    { lane: 5, percent: 0, status: "base" },
    { lane: 6, percent: 0, status: "base" },
    { lane: 7, percent: 0, status: "base" },
    { lane: 8, percent: 0, status: "base" },
    { lane: 9, percent: 0, status: "base" },
  ]);

  // 마을별 출석 카운트 조회 API
  const handleListDepartmentCount = async () => {
    try {
      const { data: departmentData = [] } = await api.listDepartmentCount({
        query: {},
      });
      let newData = [
        { lane: 1, percent: 0, status: "base", color: "#CE6EE3" },
        { lane: 2, percent: 0, status: "base", color: "#5E36E0" },
        { lane: 3, percent: 0, status: "base", color: "#FF3939" },
        { lane: 4, percent: 0, status: "base", color: "#32A6F0" },
        { lane: 5, percent: 0, status: "base", color: "#FF803B" },
        { lane: 6, percent: 0, status: "base", color: "#F16EAF" },
        { lane: 7, percent: 0, status: "base", color: "#3AD2A2" },
        { lane: 8, percent: 0, status: "base", color: "#53D856" },
        { lane: 9, percent: 0, status: "base", color: "#FFBC3B" },
      ];

      // 마을별 평균값을 구하여 newData에 저장
      _.forEach(departmentData, (item, key) => {
        if (item?.department_name === "소담마을") {
          newData[0].percent = parseFloat(
            Number((item?.total_attendance_count * 100) / item?.max_attendance_count).toFixed(2)
          );
        } else if (item?.department_name === "도담마을") {
          newData[1].percent = parseFloat(
            Number((item?.total_attendance_count * 100) / item?.max_attendance_count).toFixed(2)
          );
        } else if (item?.department_name === "어울림마을") {
          newData[2].percent = parseFloat(
            Number((item?.total_attendance_count * 100) / item?.max_attendance_count).toFixed(2)
          );
        } else if (item?.department_name === "울림마을") {
          newData[3].percent = parseFloat(
            Number((item?.total_attendance_count * 100) / item?.max_attendance_count).toFixed(2)
          );
        } else if (item?.department_name === "이음마을") {
          newData[4].percent = parseFloat(
            Number((item?.total_attendance_count * 100) / item?.max_attendance_count).toFixed(2)
          );
        } else if (item?.department_name === "에하드") {
          newData[5].percent = parseFloat(
            Number((item?.total_attendance_count * 100) / item?.max_attendance_count).toFixed(2)
          );
        } else if (item?.department_name === "세붐마을") {
          newData[6].percent = parseFloat(
            Number((item?.total_attendance_count * 100) / item?.max_attendance_count).toFixed(2)
          );
        } else if (item?.department_name === "새움청년부") {
          newData[7].percent = parseFloat(
            Number((item?.total_attendance_count * 100) / item?.max_attendance_count).toFixed(2)
          );
        } else if (item?.department_name === "주일학교") {
          newData[8].percent = parseFloat(
            Number((item?.total_attendance_count * 100) / item?.max_attendance_count).toFixed(2)
          );
        }
      });

      // 평균값을 기준으로 정렬
      let orderByPercentList = _.orderBy(newData, "percent", "desc");

      orderByPercentList[0].status = "glad";
      orderByPercentList[1].status = "glad";
      orderByPercentList[7].status = "sad";
      orderByPercentList[8].status = "sad";

      setPlayers(orderByPercentList);
    } catch (error) {
      message.error(
        error.response ? `${error.response.data.code}, ${error.response.data.message}` : "마을별 출석 카운트 조회 실패"
      );
    } finally {
      // setIsLoading(false);
    }
  };

  // Player width size
  const playerWidth = Number((document.body.offsetWidth * 18) / 100).toFixed(2);

  /** Effect */
  useEffect(() => {
    handleListDepartmentCount();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="rank-mobile-title">
        <Image width={300} height={160} src={title} preview={false} />
      </div>
      <div className="rank-mobile-content">
        {_.map(players, (item, index) => {
          return (
            <div className="player-wrap">
              <div className="player">
                <Player laneNo={item?.lane} playerWidth={playerWidth} playerStatus={item?.status} />
              </div>
              <div className="player-progress-wrap">
                <Progress
                  strokeColor={{
                    "0%": item?.color,
                    "100%": item?.color,
                  }}
                  status="active"
                  percent={item?.percent}
                />
                <div className="player-percent">{item?.percent}%</div>
                <div className="rank-number">#{index + 1}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RankMobile;
