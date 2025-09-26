import React, { useRef } from "react";

const SearchBar = () => {
  const inputRef = useRef();

  const handleSearch = () => {
    const q = (inputRef.current?.value || "").trim();
    const url = `/search?name=${encodeURIComponent(q)}`;
    window.location.href = url;
  };

  return (
    <div className="flex-1 flex items-center">
      <input
        type="text"
        placeholder="Upcoming Project Name"
        className="w-80 border border-black rounded-l-md p-1"
        ref={inputRef}
      />
      <button
        className="border border-black rounded-r-md p-1 bg-white hover:bg-slate-600"
        onClick={handleSearch}
      >
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
