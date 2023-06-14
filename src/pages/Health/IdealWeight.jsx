import {useState} from "react";
import {Form} from "react-bootstrap";
import {CountButton} from "../../components/CountButton/CountButton.jsx";

export const IdealWeight = () => {
  const [result, setResult] = useState("");

  return (
    <div>
      <div className={"container text-start"}>
        <div className={"row mb-4"}>
          <div className={"col-sm mb-5"}>
            <h3 className={"mb-5"}>Калькулятор идеального веса</h3>
            <Form>
              <Form.Group className={"mb-4 row"} controlId={"height"}>
                <div className={"col-4 text-nowrap"}>
                  <Form.Label>Рост (см)</Form.Label>
                </div>
                <div className={"col-8"}>
                  <Form.Control type={"text"}/>
                </div>
              </Form.Group>
              <Form.Group className={"mb-4 row"} controlId={"age"}>
                <div className={"col-4 text-nowrap"}>
                  <Form.Label className={"col-4"}>Обхват грудной клетки (см)</Form.Label>
                </div>
                <div className={"col-8"}>
                  <Form.Control type={"text"}/>
                </div>
              </Form.Group>
              <Form.Group className={"mb-4 row"} controlId={"sex"}>
                <div className={"col-4 text-nowrap"}>
                  <Form.Label className={"col-4"}>Пол</Form.Label>
                </div>
                <div className={"col-8"}>
                  <Form.Select aria-label="Пол">
                    <option value="man">Мужской</option>
                    <option value="woman">Женский</option>
                  </Form.Select>
                </div>
              </Form.Group>
              <Form.Group className={"mb-4 row"} controlId={"wrist"}>
                <div className={"col-4 text-nowrap"}>
                  <Form.Label>Обхват запястья (см)</Form.Label>
                </div>
                <div className={"col-8"}>
                  <Form.Control type={"text"}/>
                </div>
              </Form.Group>
              <CountButton color={"bg-deep-green"}/>
            </Form>
          </div>
          <div className={"col-sm mb-5"}>
            <h3 className={"mb-5"}>Результат</h3>
            <div className={"w-100 h-75 p-4 bg-secondary-subtle border border-3 border-secondary"}>{result}</div>
          </div>
        </div>
      </div>
      <div>
        <p>Калькулятор веса поможет вам определить идеальный вес исходя из вашего реального роста. Благодаря полученным
          данным вы сможете узнать стоит ли вам сбросить лишние килограммы или же наоборот набрать полезную массу
          тела.
        </p>
        <div className={"mb-5 text-start"}>
          <h3>Масса тела по Броку</h3>
          <p>
            Французский антрополог Поль Брока предложил формулу для определения веса в 19 веке. Она считается более
            точной, поскольку для расчетов в ней принимаются во внимание три ключевых параметра человеческого тела:
            рост, возраст и тип телосложения (имеется ввиду ширина кости - тонкокостный, ширококостный или нормальный).
          </p>
          <p>Конечно же, полученные данные являются среднестатистическими, поскольку каждый организм человека
            уникальный, у каждого он функционирует совершенно по разному. Кроме того система не принимает во внимание
            питание и образ жизни человека. Однако, калькулятор веса позволит вам узнать приблизительный показатель
            идеального веса с той целью, чтобы вы в своей жизни смогли, по возможности, держаться как можно ближе своего
            полезного веса. </p>
        </div>
      </div>
    </div>
  );
};
