import React, { useContext, useEffect, useState } from "react";
import Heading from "../../src/components/common/Heading";
import AnimeContext from "../../src/context/AnimeContext";
import CardHistory from "../../src/components/common/CardHistory";

function History() {
  const { currentUser, getData } = useContext(AnimeContext);
  const [history, setHistory] = useState([]);

 
  useEffect(() => {
    const getHistory = async () => {
      try {
        if (currentUser) {
          const data = await getData("/Historys");
          const movies = await getData("/Movies");
          const history = data.find((item) => item.email === currentUser.email);
          const listHistory = [];
          if (history) {
            for (let id of history.movieId) {
              for (let val of movies) {
                if (val._id === id) listHistory.push(val);
              }
            }
            setHistory(listHistory);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getHistory();
  }, []);

  if (!currentUser) {
    return (
      <div className="follow-section">
        <h2>Vui lòng đăng nhập để xem lịch sử phim đã xem.</h2>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="history-section">
        <Heading name="lịch sử đã xem" />
        <h2>Danh sách lịch sử đang trống.</h2>
      </div>
    );
  }

  return (
    <>
      <div className="history-section">
        <Heading name="lịch sử đã xem" />
        <div className="history-list">
          {history.map((item) => (
            <CardHistory key={item._id} movie={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default History;
