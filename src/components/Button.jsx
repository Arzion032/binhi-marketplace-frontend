export const Button = ({ children, className = "", variant = "primary" }) => {
  const baseClasses = "w-full rounded-full text-lg h-14 transition duration-300 ease-in-out";

  const variants = {
    primary: "bg-green-600 text-white shadow-md hover:bg-green-600 hover:shadow-green-500 focus:outline-none focus:ring-0",
    outline: "border border-gray-800 text-gray-900 bg-transparent hover:bg-gray-100 focus:outline-none focus:ring-0",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};
