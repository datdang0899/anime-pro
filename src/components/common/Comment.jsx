/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import AnimeContext from "../../context/AnimeContext";
import CommentBox from "./CommentBox";

function Comment({ movieId }) {
  const { getData, currentUser } = useContext(AnimeContext);
  const [comment, setComment] = useState([]);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const getDataFromApi = async () => {
      try {
        const data = await getData("/Comments");
        const arr = [];
        for (let val of data) {
          if (val.movieId === movieId) arr.push(val);
        }
        setComment(arr);
      } catch (error) {
        alert(error);
      }
    };

    const getNickname = async () => {
      const data = await getData("/Users");
      const user = data.find((u) => u.email === currentUser.email);
      setNickname(user.nickname);
    };

    getDataFromApi();
    if (currentUser) getNickname();
  }, [comment]);

  return (
    <div className="comment">
      <h2>Bình luận ({comment.length})</h2>
      {!currentUser && (
        <Link href="/login">
          <a className="button-link">Đăng nhập để bình luận</a>
        </Link>
      )}
      {currentUser && <CommentBox nickname={nickname} movieId={movieId} />}
      <div className="comment-container">
        {comment.map((item, index) => (
          <div key={index} className="comment-item">
            <div className="image-avt">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/anime-hay-8c35a.appspot.com/o/avatar-user.png?alt=media&token=a0adfa82-f118-4dfd-9ee7-92d5fee24ec7"
                alt="avatar-image"
              />
            </div>
            <div className="comment-content">
              <h5>{item.nickname}</h5>
              <p>{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comment;
