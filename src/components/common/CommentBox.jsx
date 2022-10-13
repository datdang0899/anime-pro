import React, { useContext, useRef } from "react";
import AnimeContext from "../../context/AnimeContext";

function CommentBox({ nickname , movieId }) {
  const { insertData } = useContext(AnimeContext);
  const body = useRef(null);

  const handleComment = async () => {

    const data = {
      movieId: movieId,
      nickname: nickname,
      body: body.current.value,
    };
    const id = Date.now().toString() ;  
    if(data.body.length === 0 ) return ; 
    try {
      await insertData("Comments/", id, data);
      body.current.value =''
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="comment-box">
      <textarea
        ref={body}
        placeholder="Nhập bình luận bạn tại đây."
        id="comment-text"
      />
      <button onClick={handleComment}>Bình luận</button>
    </div>
  );
}

export default CommentBox;
