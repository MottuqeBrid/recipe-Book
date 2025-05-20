import { use } from "react";
import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "../../providers/ThemeContext";

const ThemeToggle = () => {
  const { toggleTheme, theme } = use(ThemeContext);

  const toggleThemeData = () => {
    toggleTheme();
  };

  return (
    <button
      onClick={toggleThemeData}
      className="btn btn-sm px-3 bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
    >
      {theme === "dark" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5 " />
      )}
    </button>
  );
};

export default ThemeToggle;
