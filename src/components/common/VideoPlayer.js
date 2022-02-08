import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
  return (
    <ReactPlayer
      className="video-player-wrap"
      url="https://www.youtube.com/watch?v=38hvLwK_BH4"
      playing
      controls
    />
  );
};

export default VideoPlayer;
