import React, { useState } from "react";
import Pagination from "./Pagination";
import CardMovie from "./CardMovie";
import Heading from "./Heading";
import _ from "lodash";
import { paginate } from "../utils/paginate";

function MovieList({ heading, movies }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const getPagedData = () => {
    return paginate(movies, currentPage, pageSize);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const allMovies = getPagedData();

  if (movies.length === 0) {
    return <h2 className="home-title">Danh sách đang còn trống .</h2>;
  }

  return (
    <div className="movie-list">
      <Heading name={heading} />
        <div className="movie-wrapper">
          <div className="row">
            {allMovies.map((movie) => (
              <CardMovie key={movie._id} movie={movie} />
            ))}
          </div>
        </div>
      <Pagination
        itemsCount={movies.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default MovieList;
