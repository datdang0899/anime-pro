import React from "react";

function SearchBox({ value, onChange }) {
  return (
    <React.Fragment>
      <input
        type="search"
        value={value}
        name="query"
        onChange={(e) => onChange(e.currentTarget.value)}
        placeholder="search..."
      />
      <span>
        <i className="fa fa-search" aria-hidden="true"></i>
      </span>
    </React.Fragment>
  );
}

export default SearchBox;
