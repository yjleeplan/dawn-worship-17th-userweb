import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
    return (
        <ReactPlayer className='video-player-wrap' url='https://www.youtube.com/watch?v=7C2z4GqqS5E' playing controls />
    );
};

export default VideoPlayer;