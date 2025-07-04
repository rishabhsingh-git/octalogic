const Card = ({ title, children }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md w-full max-w-lg mx-auto border border-gray-200 transition-all hover:shadow-lg mt-40">
      {title && (
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default Card;
