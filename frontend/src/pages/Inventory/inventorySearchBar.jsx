import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function SearchBar() {
  const { id } = useParams();
  //initializing state to store the user input query
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  function handleChange(e) {
    setQuery(e.target.value);
  }

  const searchData = async (e) => {
    e.preventDefault();

    //navigate to search results page with the query
    navigate(`/inventory/searchResult/${id}?q=${query}`);

    setQuery("");
  };

  return (
    <div>
      <div
        className="absolute w-1/3"
        style={{ marginLeft: "-17rem", marginTop: "-1rem" }}
      >
        <input
          type="search"
          id="product-search"
          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="Search by Product Name or Tea Type"
          onChange={handleChange}
          value={query}
          required
        />
        <button
          type="submit"
          onClick={searchData}
          className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
    </div>
  );
}
