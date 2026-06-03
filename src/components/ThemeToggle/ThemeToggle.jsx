import { useTheme }
  from "../../context/ThemeContext";

function ThemeToggle() {

  const {
    theme,
    toggleTheme
  } = useTheme();

  return (

    <button
      onClick={toggleTheme}
    >

      {
        theme === "light"
          ? "🌙 Dark Mode"
          : "☀️ Light Mode"
      }

    </button>

  );

}

export default ThemeToggle;