import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext.jsx";
import { SEO } from "../components/SEO/SEO.jsx";

export function Index() {
  const [theme] = useContext(ThemeContext);

  return (
    <>
      <SEO theme={theme} />
      <div className="desc">
        <h1>Онлайн калькуляторы, конвертеры и полезные инструменты</h1>
        <p>Calcus - это каталог онлайн калькуляторов по различным тематикам.</p>
      </div>
    </>
  );
}
