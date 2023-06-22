import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "../contexts/ThemeContext.jsx";
import { SEO } from "../components/SEO/SEO.jsx";

export function Index() {
  const [theme] = useContext(ThemeContext);
  const location = useLocation();

  return (
    <motion.div
      key={location.key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <SEO
        theme={theme}
        title="Calcus - Онлайн калькуляторы"
        name="description"
        content="Calcus - это каталог онлайн калькуляторов по различным тематикам."
      />
      <h1 className="font-pt-sans-700">Онлайн калькуляторы, конвертеры и полезные инструменты</h1>
      <p className="font-pt-sans-400">Calcus - это каталог онлайн калькуляторов по различным тематикам.</p>
    </motion.div>
  );
}
