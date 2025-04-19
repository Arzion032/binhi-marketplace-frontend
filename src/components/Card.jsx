// Card.jsx
export const Card = ({ children, className }) => {
  return (
    <div className={`p-6 rounded-lg bg-white shadow-md ${className}`}>
      {children}
    </div>
  );
};
