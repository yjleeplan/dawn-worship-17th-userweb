import { Image } from "antd";
import React from "react";
import player1 from "../../assets/images/player_1.gif";
import player1Glad from "../../assets/images/player_1_glad.gif";
import player1Sad from "../../assets/images/player_1_sad.gif";
import player2 from "../../assets/images/player_2.gif";
import player2Glad from "../../assets/images/player_2_glad.gif";
import player2Sad from "../../assets/images/player_2_sad.gif";
import player3 from "../../assets/images/player_3.gif";
import player3Glad from "../../assets/images/player_3_glad.gif";
import player3Sad from "../../assets/images/player_3_sad.gif";
import player4 from "../../assets/images/player_4.gif";
import player4Glad from "../../assets/images/player_4_glad.gif";
import player4Sad from "../../assets/images/player_4_sad.gif";
import player5 from "../../assets/images/player_5.gif";
import player5Glad from "../../assets/images/player_5_glad.gif";
import player5Sad from "../../assets/images/player_5_sad.gif";
import player6 from "../../assets/images/player_6.gif";
import player6Glad from "../../assets/images/player_6_glad.gif";
import player6Sad from "../../assets/images/player_6_sad.gif";
import player7 from "../../assets/images/player_7.gif";
import player7Glad from "../../assets/images/player_7_glad.gif";
import player7Sad from "../../assets/images/player_7_sad.gif";
import player8 from "../../assets/images/player_8.gif";
import player8Glad from "../../assets/images/player_8_glad.gif";
import player8Sad from "../../assets/images/player_8_sad.gif";
import player9 from "../../assets/images/player_9.gif";
import player9Glad from "../../assets/images/player_9_glad.gif";
import player9Sad from "../../assets/images/player_9_sad.gif";

const Player = ({ laneNo, playerWidth, playerStatus }) => {
  // Player 이미지 소스
  const playerSource = () => {
    const key = `player_${laneNo}_${playerStatus}`;

    return {
      player_1_base: player1,
      player_1_glad: player1Glad,
      player_1_sad: player1Sad,
      player_2_base: player2,
      player_2_glad: player2Glad,
      player_2_sad: player2Sad,
      player_3_base: player3,
      player_3_glad: player3Glad,
      player_3_sad: player3Sad,
      player_4_base: player4,
      player_4_glad: player4Glad,
      player_4_sad: player4Sad,
      player_5_base: player5,
      player_5_glad: player5Glad,
      player_5_sad: player5Sad,
      player_6_base: player6,
      player_6_glad: player6Glad,
      player_6_sad: player6Sad,
      player_7_base: player7,
      player_7_glad: player7Glad,
      player_7_sad: player7Sad,
      player_8_base: player8,
      player_8_glad: player8Glad,
      player_8_sad: player8Sad,
      player_9_base: player9,
      player_9_glad: player9Glad,
      player_9_sad: player9Sad,
    }[key];
  };

  return (
    <div>
      <Image width={`${playerWidth}px`} src={playerSource()} preview={false} />
    </div>
  );
};

export default Player;
