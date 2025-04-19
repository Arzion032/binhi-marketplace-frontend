import { useLocation } from "react-router-dom";

const AuthLabel = () => {
  const path = useLocation().pathname;

  return (
    <span className="text-gray-300 text-lg font-semibold ml-2">
      {path === "/login" ? "Log In" : path === "/signup" ? "Sign Up" : ""}
    </span>
  );
};
export default AuthLabel;
