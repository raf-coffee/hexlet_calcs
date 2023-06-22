import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext.jsx";
import { SEO } from "../components/SEO/SEO.jsx";

export function Index() {
  const [theme] = useContext(ThemeContext);

  return (
    <>
      <SEO
        theme={theme}
        title="Calcus - Онлайн калькуляторы"
        name="description"
        content="Calcus - это каталог онлайн калькуляторов по различным тематикам."
      />
      <h1 className="font-pt-sans-700">Онлайн калькуляторы, конвертеры и полезные инструменты</h1>
      <p className="font-pt-sans-400">Calcus - это каталог онлайн калькуляторов по различным тематикам.</p>
    </>
  );
}
