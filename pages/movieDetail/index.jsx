import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import AnimeContext from "../../src/context/AnimeContext";
import Info from "../../src/components/common/Info";
import ListEpisode from "../../src/components/common/ListEpisode";

function InfoMovie() {
  const [movie, setMovie] = useState({});
  const [list, setList] = useState([]);
  const { getData, currentUser, insertData } = useContext(AnimeContext);
  const router = useRouter();
  const movieId = router.query?.movie;

  const handleFollow = async () => {
    try {
      // insert history in server .
      let FollowId = "";
      let newList = null;
      try {
        const data = await getData("/Followed");
        const Follow = data.find((i) => i.email === currentUser.email);
        // add history if not defiend .
        if (Follow === undefined) {
          if (FollowId.length === 0) FollowId = Date.now().toString();
          const list = [movieId];
          const data = {
            follow_id: FollowId,
            email: currentUser.email,
            movieId: list,
          };
          try {
            await insertData("Followed/", FollowId, data);
            FollowId = "";
            toast.success("bạn đã theo dõi thành công .");
          } catch (error) {
            console.log(error);
          }
        } else {
          const listMovieId = Follow.movieId;
          FollowId = Follow.follow_id;
          if (listMovieId.length === 0) {
            listMovieId.push(movieId);
            newList = listMovieId;
          } else {
            let check = false;
            listMovieId.forEach((id) => {
              if (id === movieId) check = true;
            });
            if (!check) listMovieId.push(movieId);
            newList = listMovieId;
          }
        }
      } catch (error) {
        console.log(error);
      }
      if (FollowId.length === 0) FollowId = Date.now().toString();
      // handle add history
      if (newList) {
        const data = {
          follow_id: FollowId,
          email: currentUser.email,
          movieId: newList,
        };
        try {
          await insertData("Followed/", FollowId, data);
          toast.success("Bạn đã theo dõi thành công.");
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getDataFromApi = async () => {
      try {
        const data = await getData("Movies/");
        const movie = data.find((m) => m._id === movieId);
        setMovie(movie);
        setList(movie.episodes);
      } catch (error) {
        alert(error);
      }
    };

    getDataFromApi();
  }, []);

  return (
    <div className="info-movie">
      <h1>{movie.title}</h1>
      <div className="info-container">
        <div className="info-image">
          <img src={movie.poster} alt="" />
        </div>
        <ul className="info-list">
          {Info.renderItem("Thể loại", movie.genre)}
          {Info.renderItem("Số tập", movie.numberInStock)}
          {Info.renderItem("Đánh giá", movie.starRating)}
        </ul>
      </div>
      {currentUser && (
        <div className="info-nav">
          <button className="i-bookmark" onClick={handleFollow}>
            <i className="fa fa-bookmark" aria-hidden="true"></i>
          </button>
        </div>
      )}
      <ListEpisode list={list} movie={movie} />
      <div className="info-content">
        <h4>Nội dung</h4>
        <p>{movie.content}</p>
      </div>
    </div>
  );
}

export default InfoMovie;
