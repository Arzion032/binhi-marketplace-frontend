export const Input = ({ type = "text", placeholder }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered rounded-full border-gray w-full focus:outline-none focus:ring-2 focus:ring-green-600"
      />
    );
  };
  