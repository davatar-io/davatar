import React from "react";
import Lottie from "react-lottie-player";

import loadingAndroid from "../animations/loadingAndroid.json";
// import loadingAndroid from "../animations/paperplane.json";

const LoadingIndicator = () => {
  return (
    <Lottie
      loop
      animationData={loadingAndroid}
      play
      style={{ width: 150, height: 150 }}
    />
  );
};

export default LoadingIndicator;
