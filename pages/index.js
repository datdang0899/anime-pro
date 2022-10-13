import React, { useContext, useEffect, useState } from "react";
import AnimeContext from "../src/context/AnimeContext";
import MovieList from "../src/components/common/MovieList";
import Slide from "../src/components/common/Slide";


export default function Home() {
  const { getData } = useContext(AnimeContext);
  const [movies, setMovies] = useState([]);
  const [slide, setSlide] = useState([]);

  const handleGetData = async () => {
    try {
      const movies = await getData("Movies");
      const slides = await getData("Slides");
      // get slides block below .
      const data = [];
      slides.forEach((slide) => {
        let value = movies.find((mov) => mov._id === slide._id);
        if (value) data.push(value);
      });
      // set state of slide and movies.
      setSlide(data);
      setMovies(movies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <div className="home-section">
      <Slide slides={slide} />
      <MovieList heading="mới cập nhật" movies={movies} />
    </div>
  );
}
