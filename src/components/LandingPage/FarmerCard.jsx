import React from "react";

const FarmerCard = ({ farmer, className = "", style = {}, ...rest }) => {
  return (
      <div
        className={`bg-white rounded-2xl border-[3px] border-black-200 shadow-md w-[350px] text-center flex flex-col items-center justify-between relative ${className}`}
        style={style}
        {...rest}
      >
      <div className="flex flex-col items-center justify-between h-full w-full">
        <div className="px-6 pt-6 pb-4 w-full flex-1 flex flex-col items-center">
          <div className="relative w-24 h-24">
            <img
              src={farmer.img}
              alt={farmer.name}
              className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg"
            />
            <img
              src={`/medal-${farmer.rank}.png`}
              alt="medal"
              className="absolute -top-0 -right-1 w-8 h-8 z-10"
            />
          </div>
          <h3 className="mt-4 text-2xl font-semibold">{farmer.name}</h3>
          <p className="text-sm text-gray-500">{farmer.location}</p>
          <div className="flex items-center gap-2 font-medium mt-1">
            <img src="/Star.png" alt="star" className="h-5 w-5" />
            <span className="text-black">{Number(farmer.rating).toFixed(1)}</span>
            <span className="text-gray-500 ml-1">|</span>
            <span className="text-gray-500 ml-2">{farmer.sold} Sold</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {farmer.categories.map((cat, idx) => {
              let baseClass = 'px-3 py-1 text-sm font-medium rounded-full';
              let tagClass = '';

              switch (cat.toLowerCase()) {
                case 'vegetables':
                case 'root crops':      
                case 'milks & dairy':
                  tagClass = 'bg-[#8BC34A] text-white';
                  break;
                case 'grains':
                case 'fruits':
                  tagClass = 'bg-[#D1A157] text-white';
                  break;
                case 'meat':
                case 'rice':
                  tagClass = 'bg-[#4CAE4F] text-white';
                  break;
                default:
                  tagClass = 'bg-green-100 text-green-800';
                  break;
              }

              return (
                <span key={idx} className={`${baseClass} ${tagClass}`}>
                  {cat}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerCard;
