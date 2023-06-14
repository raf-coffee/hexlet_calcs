import { useState } from "react";
import { Form } from "react-bootstrap";
import { CountButton } from "../../components/CountButton/CountButton.jsx";

export function NDFL() {
  const [result] = useState("");
  const [checked, setChecked] = useState("before");

  const handleCheckboxToggle = (e) => {
    setChecked(e.target.value);
  };

  return (
    <div>
      <div className="container text-start">
        <div className="row mb-4">
          <div className="col-sm mb-5">
            <h3 className="mb-5">Калькулятор НДФЛ</h3>
            <Form>
              <Form.Group key="nds-checkbox" controlId="pays" className="mb-4 row d-flex justify-content-end">
                <div className="col-7">
                  <Form.Check
                    name="before"
                    value="before"
                    type="radio"
                    label="Известна сумма до налогообложения"
                    id="ndfl-checkbox-1"
                    checked={checked === "before"}
                    onChange={handleCheckboxToggle}
                  />
                  <Form.Check
                    name="after"
                    value="after"
                    type="radio"
                    label="Известна сумма после налогообложения"
                    id="ndfl-checkbox-2"
                    checked={checked === "after"}
                    onChange={handleCheckboxToggle}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-4 row" controlId="">
                <div className="col-5 text-nowrap">
                  <Form.Label>Сумма до налогообложения (руб.)</Form.Label>
                </div>
                <div className="col-7">
                  <Form.Control type="text" />
                </div>
              </Form.Group>
              <Form.Group className="mb-4 row" controlId="firstPay">
                <div className="col-5 text-nowrap">
                  <Form.Label>Налог</Form.Label>
                </div>
                <div className="col-7">
                  <Form.Select aria-label="Налог">
                    <option value="podohod">Подоходный налог (13% - 15%)</option>
                    <option value="dividend">Налог на дивиденды (13%)</option>
                    <option value="neresident">НДФЛ для нерезидентов (30%)</option>
                    <option value="victory">Налог на выигрыши (35%)</option>
                  </Form.Select>
                </div>
              </Form.Group>
              <CountButton color="bg-deep-green" />
            </Form>
          </div>
          <div className="col-sm mb-5">
            <h3 className="mb-5">Результат</h3>
            <div className="w-100 h-50 p-4 bg-secondary-subtle border border-3 border-secondary">{result}</div>
          </div>
        </div>
        <h3>Описание калькулятора</h3>
        <p>Налоговый калькулятор предназначен для расчета налога на доход физических лиц (НДФЛ).</p>
        <div className="border border-3 border-success-subtle p-3 mb-4">
          <p>Калькулятор налогов производит 2 типа расчетов:</p>
          <ul>
            <li>
              Расчет НДФЛ и суммы после налогообложения при известном значении дохода. Например, вы получили доход и вам
              необходимо рассчитать налог, а также сумму, которая у вас останется после уплаты налога.
            </li>
            <li>
              Вычисление НДФЛ и суммы дохода при известном значении суммы, оставшейся после налогообложения. Например,
              вы получили на руки определенную сумму, с которой уже был удержан налог. Калькулятор рассчитает, сколько
              налога было удержано и какова была сумма до налогообложения.
            </li>
          </ul>
        </div>
        <div>
          <p>К доходам физического лица относятся:</p>
          <ul>
            <li>
              <span className="fw-bold">Заработная плата</span> - когда вы получаете на работе зарплату, работодатель
              автоматически удерживает с неё подоходный налог - 13%. Работодатель является здесь вашим налоговым
              агентом, и у вас нет необходимости заботиться об уплате НДФЛ и подаче декларации, т.к. работодатель делает
              это за вас.
            </li>
            <li>
              <span className="fw-bold">Дивиденды</span> - до 2015 года налог на дивиденды облагался по ставке 9%.
              Сейчас ставка - 13%. Брокер здесь является вашим налоговым агентом и автоматически высчитывает и
              уплачивает налог с полученных дивидендов.
            </li>
            <li>
              <span className="fw-bold">Выигрыши</span> - налог на выигрыши облагается по ставке 35%.
            </li>
            <li>
              <span className="fw-bold">Другой доход</span> - любой другой доход, полученный физическим лицом,
              облагается налогом по ставке 13%. Это может быть сдача квартиры в аренду или продажа самодельных вещей. В
              этом случае вам необходимо самостоятельно заботиться об уплате НДФЛ и подаче декларации.
            </li>
          </ul>
        </div>
        <div
          className="border border-4 border-success-subtle rounded-4 p-3 d-flex align-items-center justify-content-center fw-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-exclamation-circle-fill text-success me-2"
            width="32"
            height="30"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
          </svg>
          <p className="m-0">С 2021 года для доходов размером выше 5 000 000 рублей введена ставка 15%.</p>
        </div>
      </div>
    </div>
  );
}
