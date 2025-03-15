import React from "react";

const Background = ({ children }) => {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #D1E9FF 0%, #84CAFF 120%)",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
          
        }}
    >
      {children}
    </div>
  );
};

export default Background;
