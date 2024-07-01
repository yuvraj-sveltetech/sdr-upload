import React from "react";

const Loader = () => {
  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12"></feGaussianBlur>
          <feColorMatrix
            values="0 0 0 0 0 
            0 0 0 0 0 
            0 0 0 0 0 
            0 0 0 48 -7"
          ></feColorMatrix>
        </filter>
      </svg>

      <div className="loader m-auto !mb-3"></div>
    </>
  );
};

export default Loader;
