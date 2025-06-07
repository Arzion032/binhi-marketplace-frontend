import React from 'react';
import Loading from '../../assets/loadingAnimation.mp4?url';  // Add ?url

const LoadingScreen = () => {
  return (
    <div className="flex justify-center mt-20">
      <video
        className="w-[350px] h-[350px]"
        src={Loading}
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
};

export default LoadingScreen;