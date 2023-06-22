import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Image } from "react-bootstrap";
import { ThemeContext } from "../../contexts/ThemeContext.jsx";
import { SEO } from "../../components/SEO/SEO.jsx";
import underConstruction from "../../assets/images/under-construction.webp";

export function Currency() {
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
        name="description"
        content="Калькулятор валют поможет вам быстро перевести любую сумму из одной валюты в другую."
        title="Валютный калькулятор"
      />
      <div className="container text-start">
        <div className="row mb-4">
          <div className="col">
            <h3>Конвертер валют</h3>
          </div>
          <div className="col">
            <h3>Результат</h3>
          </div>
        </div>
      </div>
      <div>
        <h3>Описание конвертера</h3>
        <Image src={underConstruction} className="img-fluid mx-auto d-block" />
      </div>
    </motion.div>
  );
}
