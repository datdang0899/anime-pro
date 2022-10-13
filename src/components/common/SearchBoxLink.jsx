import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import AnimeContext from "../../context/AnimeContext";

function SearchBoxLink({ searchQuery }) {
  const [filter, setFilter] = useState([]);
  const { getData } = useContext(AnimeContext);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const data = await getData("/Movies");
        if (searchQuery) {
          const filtered = data.filter((m) =>
            m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
          );
          console.log(searchQuery, filtered, data);
          setFilter(filtered);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleSearch();
  }, []);

  return (
    <div className="box-search">
      {filter.map((item) => (
        <Link key={item._id} href={`/movieDetail/${item._id}`}>
          <a className="search-link">{item.title}</a>
        </Link>
      ))}
    </div>
  );
}

export default SearchBoxLink;
