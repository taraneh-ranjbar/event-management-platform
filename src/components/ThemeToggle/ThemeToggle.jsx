import { useTheme }
  from "../../context/ThemeContext";

function ThemeToggle() {

  const {
    theme,
    toggleTheme
  } = useTheme();

  const isLight = theme === "light";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={
        isLight
          ? "Switch to dark mode"
          : "Switch to light mode"
      }
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {isLight ? "🌙" : "☀️"}
      </span>
      <span className="theme-toggle__label">
        {isLight ? "Dark" : "Light"}
      </span>
    </button>
  );

}

export default ThemeToggle;
