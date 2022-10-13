import React from "react";
import Link from "next/link";
import Loading from "../Loading";

function ListEpisode({ list, movie }) {
  if (list.length === 0) {
    return <Loading />;
  }

  return (
    <div className="list-episode">
      <h4>Danh sách tập</h4>
      <div className="container-box">
        {list.map((item, index) => (
          <Link key={index} href={`/watching?movie=${movie._id}&chap=${index}`}>
            <a>{index + 1}</a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ListEpisode;
