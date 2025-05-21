import { Typewriter } from "react-simple-typewriter";
// import { Fade } from "react-awesome-reveal";
import { FaUtensils } from "react-icons/fa";

export default function NoRecipes() {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="text-center max-w-md bg-white shadow-xl rounded-2xl p-8">
        <div className="text-6xl flex justify-center w-full text-red-400 mb-4">
          <FaUtensils />
        </div>

        <h1 className="text-2xl font-semibold text-gray-700 mb-2">
          <Typewriter
            words={[
              "No Recipes Found!",
              "Try Searching Again...",
              "Or Add a New One!",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h1>

        <p className="text-gray-500 mt-4">
          We couldn't find any matching recipes.
        </p>

        <button
          className="mt-6 bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition"
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </div>
    </div>
  );
}
