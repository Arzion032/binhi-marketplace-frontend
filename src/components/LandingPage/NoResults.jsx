import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NoResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || "your search";

  const suggestions = ["Carlos Yulo Rice", "Carlos Yolo Rice"];

  const handleSuggestionClick = (suggestion) => {
    navigate(`/search?query=${encodeURIComponent(suggestion)}`);
  };

  return (
    <>
<div className="py-12 flex flex-col justify-center items-center bg-[#F5F9F5] text-center pt-[230px] pb-[130px]">
        <img src="/frown.png" alt="frown" className="h-[300px] w-[300px]" />

        <h2 className="text-xl sm:text-2xl font-bold mt-4">
          No results for ‘<span className="font-semibold">{query}</span>’
        </h2>

        <div className="mt-4 text-xl text-black flex justify-center items-center flex-wrap gap-2">
          <span className="font-bold">Did you mean:</span>
          {suggestions.map((item, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(item)}
              className="px-4 py-1 border border-gray-400 rounded-full hover:bg-gray-100 transition"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

    </>
  );
};

export default NoResults;
