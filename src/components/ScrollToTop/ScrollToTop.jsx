import { useState, useEffect, useContext } from "react";
import { throttle } from "../../utills/throttle.js";
import { ThemeContext } from "../../contexts/ThemeContext.jsx";

export function ScrollToTop() {
  const [position, setPosition] = useState(0);
  const [theme] = useContext(ThemeContext);
  const handleClickToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    setPosition(window.scrollY);
  };

  const throttledHandleScroll = throttle(handleScroll, 500);

  useEffect(() => {
    window.document.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => window.document.removeEventListener("scroll", throttledHandleScroll);
  }, [throttledHandleScroll]);

  return (
    <button
      type="button"
      className={`btn scroll-to-top ${position > 400 ? "d-block" : "d-none"}`}
      onClick={handleClickToTop}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="currentColor"
        className={`bi bi-arrow-up-circle-fill ${theme === "light" ? "text-success" : ""}`}
        viewBox="0 0 16 16"
      >
        <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
      </svg>
    </button>
  );
}
