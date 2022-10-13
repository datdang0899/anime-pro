import React from "react";
import Link from "next/link";

function CardHistory({ movie }) {
  return (
    <Link href={`/movieDetail?movie=${movie._id}`}>
      <a className="card-history">
        <div className="card-image">
          <img src={movie.poster} alt="" />
        </div>
        <div className="card-content">
          <p>{movie.title}</p>
          <span>bạn đã xem.</span>
        </div>
      </a>
    </Link>
  );
}

export default CardHistory;
