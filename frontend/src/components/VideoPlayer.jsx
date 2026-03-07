import React from 'react';

function VideoPlayer() {
  return (
    <div className="max-w-[350px] mx-auto p-4 absolute top-[55%] left-[50%]">
      <video
        src="/video.mp4"
        autoPlay
        loop
        controls
        className="w-full rounded-xl shadow-lg  border-2 border-white"
        
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;
