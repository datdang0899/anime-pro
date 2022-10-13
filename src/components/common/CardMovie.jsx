import React from "react";
import Link from "next/link";

function CardMovie({ movie }) {
  return (
    <Link href={`/movieDetail?movie=${movie._id}`}>
      <a className="col-md-3 col-lg-2 col-6 mb-4" style={{ textDecoration: "none" }}>
        <div className="card-movie">
          <img src={movie.poster} alt="" />
          <div className="episode-latest">
            <span>{movie.numberInStock} Tập</span>
          </div>
          <h4>{movie.title}</h4>
          <div className="score">
            <span>{movie.starRating}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default CardMovie;
