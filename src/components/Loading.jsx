import React from "react";

function Loading() {
  const style = {
    margin: "0 auto",
    display: "block",
    height: "12rem",
  };
  return (
    <div>
      <img
        style={style}
        src="https://firebasestorage.googleapis.com/v0/b/anime-hay-8c35a.appspot.com/o/loading-cat.gif?alt=media&token=33957a71-bf44-40e3-9987-f3c90151e83f"
        alt="loading-image"
      />
    </div>
  );
}

export default Loading;
