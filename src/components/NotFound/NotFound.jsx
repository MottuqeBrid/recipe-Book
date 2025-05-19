import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center text-center px-4">
      <img
        src="https://cdn-icons-png.flaticon.com/512/857/857681.png"
        alt="Food not found"
        className="w-32 h-32 mb-6 animate-bounce"
      />
      <h1 className="text-5xl font-bold text-orange-600">404</h1>
      <h2 className="text-2xl font-semibold text-orange-500 mt-2">
        Oops! Recipe not found
      </h2>
      <p className="text-gray-600 mt-2 mb-6">
        Looks like the page you're looking for has been eaten 🍽️
      </p>
      <Link
        to="/"
        className="btn bg-orange-500 text-white hover:bg-orange-600 transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
