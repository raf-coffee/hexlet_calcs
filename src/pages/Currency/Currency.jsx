import { Image } from "react-bootstrap";
import { useContext } from "react";
import underConstruction from "../../assets/images/under-construction.webp";
import { ThemeContext } from "../../contexts/ThemeContext.jsx";
import { SEO } from "../../components/SEO/SEO.jsx";

export function Currency() {
  const [theme] = useContext(ThemeContext);
  return (
    <div>
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
    </div>
  );
}
