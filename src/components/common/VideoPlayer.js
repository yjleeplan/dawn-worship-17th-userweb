import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
    return (
        <div className='video-player-wrapper'>
            <ReactPlayer
                className='video-player'
                width='100%'
                height='100%'
                url='https://www.youtube.com/watch?v=38hvLwK_BH4'
                controls
            />
        </div>
    );
};

export default VideoPlayer;
