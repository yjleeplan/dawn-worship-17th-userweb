import { Image, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import * as api from "../../../api";
import player3 from "../../../assets/images/player_3.gif";

// #rank-layout width -> document.getElementById("rank-layout").offsetWidth
// body width -> document.body.offsetWidth

const Rank = ({ setIsLoading, isMobile }) => {
  /** State */
  const [players, setPlayers] = useState({
    lane1: 0,
    lane2: 0,
    lane3: 0,
    lane4: 0,
    lane5: 0,
    lane6: 0,
    lane7: 0,
    lane8: 0,
    lane9: 0,
  });

  // 마을별 출석 카운트 조회 API
  const handleListDepartmentCount = async () => {
    try {
      const { data: departmentData = [] } = await api.listDepartmentCount({
        query: {},
      });
      let newData = {
        lane1: 0,
        lane2: 0,
        lane3: 0,
        lane4: 0,
        lane5: 0,
        lane6: 0,
        lane7: 0,
        lane8: 0,
        lane9: 0,
      };

      departmentData?.map((item) => {
        if (item?.department_name === "소담마을") {
          newData.lane1 = Number((item?.total_attendance_count * 100) / item?.max_attendance_count).toFixed(2);
        } else if (item?.department_name === "도담마을") {
          newData.lane2 = Number((item?.total_attendance_count * 100) / item?.max_attendance_count).toFixed(2);
        } else if (item?.department_name === "어울림마을") {
          newData.lane3 = Number((item?.total_attendance_count * 100) / item?.max_attendance_count).toFixed(2);
        } else if (item?.department_name === "울림마을") {
          newData.lane4 = Number((item?.total_attendance_count * 100) / item?.max_attendance_count).toFixed(2);
        } else if (item?.department_name === "이음마을") {
          newData.lane5 = Number((item?.total_attendance_count * 100) / item?.max_attendance_count).toFixed(2);
        } else if (item?.department_name === "에하드") {
          newData.lane6 = Number((item?.total_attendance_count * 100) / item?.max_attendance_count).toFixed(2);
        } else if (item?.department_name === "세붐마을") {
          newData.lane7 = Number((item?.total_attendance_count * 100) / item?.max_attendance_count).toFixed(2);
        } else if (item?.department_name === "새움청년부") {
          newData.lane8 = Number((item?.total_attendance_count * 100) / item?.max_attendance_count).toFixed(2);
        } else if (item?.department_name === "주일학교") {
          newData.lane9 = Number((item?.total_attendance_count * 100) / item?.max_attendance_count).toFixed(2);
        }
      });

      setPlayers(newData);
    } catch (error) {
      message.error(
        error.response ? `${error.response.data.code}, ${error.response.data.message}` : "마을별 출석 카운트 조회 실패"
      );
    } finally {
      // setIsLoading(false);
    }
  };

  // Player width size
  const playerWidth = Number((window.innerWidth * 7) / 100).toFixed(2);

  // Lane top size
  const laneTop = (index) => {
    return 18.2 + 7.6 * index;
  };

  // Lane padding left size
  const lanePaddingLeft = (index) => {
    return 4.3 + 1.1 * index;
  };

  // Lane padding right size
  const lanePaddingRight = (index) => {
    return 13.1 - 1.1 * index;
  };

  // Player의 이동거리 추출
  const getPlayerStep = (index) => {
    const lanePaddingLeftPx = (window.innerWidth * lanePaddingLeft(0)) / 100;
    const lanePaddingRightPx = (window.innerWidth * lanePaddingRight(0)) / 100;
    const step = Number((window.innerWidth - lanePaddingLeftPx - lanePaddingRightPx - playerWidth) / 100).toFixed(3);
    const key = `lane${Number(index) + 1}`;
    const percent = Number(players[key]).toFixed(2) > 100 ? 100 : Number(players[key]).toFixed(2);

    return Number(step) * percent;
  };

  // 시뮬레이션 (테스트용)
  const simulate = () => {
    setPlayers((prev) => ({
      lane1: prev.lane1 + 2,
      lane2: prev.lane2 + 10,
      lane3: prev.lane3 + 9,
      lane4: prev.lane4 + 7,
      lane5: prev.lane5 + 1,
      lane6: prev.lane6 + 12,
      lane7: prev.lane7 + 8,
      lane8: prev.lane8 + 3,
      lane9: prev.lane9 + 6,
    }));
  };

  /** Effect */
  useEffect(() => {
    // 모바일로 접속 시 메인 화면으로 이동
    if (isMobile()) {
      Modal.warning({
        title: "PC로만 접속 가능합니다.",
        okText: "확인",
        onOk: async () => {
          window.location.href = "/main";
        },
      });
    }

    // simulate();
    // setInterval(() => simulate(), 2000);

    handleListDepartmentCount();
    setInterval(() => handleListDepartmentCount(), 60000);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="lane" style={{ top: `${laneTop(0)}%`, paddingLeft: `${lanePaddingLeft(0)}%` }}>
        <div className="player" style={{ marginLeft: `${getPlayerStep(0)}px` }}>
          <Image width={`${playerWidth}px`} src={player3} preview={false} />
        </div>
      </div>
      <div className="lane" style={{ top: `${laneTop(1)}%`, paddingLeft: `${lanePaddingLeft(1)}%` }}>
        <div className="player" style={{ marginLeft: `${getPlayerStep(1)}px` }}>
          <Image width={`${playerWidth}px`} src={player3} preview={false} />
        </div>
      </div>
      <div className="lane" style={{ top: `${laneTop(2)}%`, paddingLeft: `${lanePaddingLeft(2)}%` }}>
        <div className="player" style={{ marginLeft: `${getPlayerStep(2)}px` }}>
          <Image width={`${playerWidth}px`} src={player3} preview={false} />
        </div>
      </div>
      <div className="lane" style={{ top: `${laneTop(3)}%`, paddingLeft: `${lanePaddingLeft(3)}%` }}>
        <div className="player" style={{ marginLeft: `${getPlayerStep(3)}px` }}>
          <Image width={`${playerWidth}px`} src={player3} preview={false} />
        </div>
      </div>
      <div className="lane" style={{ top: `${laneTop(4)}%`, paddingLeft: `${lanePaddingLeft(4)}%` }}>
        <div className="player" style={{ marginLeft: `${getPlayerStep(4)}px` }}>
          <Image width={`${playerWidth}px`} src={player3} preview={false} />
        </div>
      </div>
      <div className="lane" style={{ top: `${laneTop(5)}%`, paddingLeft: `${lanePaddingLeft(5)}%` }}>
        <div className="player" style={{ marginLeft: `${getPlayerStep(5)}px` }}>
          <Image width={`${playerWidth}px`} src={player3} preview={false} />
        </div>
      </div>
      <div className="lane" style={{ top: `${laneTop(6)}%`, paddingLeft: `${lanePaddingLeft(6)}%` }}>
        <div className="player" style={{ marginLeft: `${getPlayerStep(6)}px` }}>
          <Image width={`${playerWidth}px`} src={player3} preview={false} />
        </div>
      </div>
      <div className="lane" style={{ top: `${laneTop(7)}%`, paddingLeft: `${lanePaddingLeft(7)}%` }}>
        <div className="player" style={{ marginLeft: `${getPlayerStep(7)}px` }}>
          <Image width={`${playerWidth}px`} src={player3} preview={false} />
        </div>
      </div>
      <div className="lane" style={{ top: `${laneTop(8)}%`, paddingLeft: `${lanePaddingLeft(8)}%` }}>
        <div className="player" style={{ marginLeft: `${getPlayerStep(8)}px` }}>
          <Image width={`${playerWidth}px`} src={player3} preview={false} />
        </div>
      </div>
    </>
  );
};

export default Rank;
