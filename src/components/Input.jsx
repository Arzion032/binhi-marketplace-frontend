export const Input = ({ type = "text", placeholder }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered rounded-full border-gray-800 w-full  h-10 focus:outline-none focus:ring-2 focus:ring-green-600"
      />
    );
  };
  