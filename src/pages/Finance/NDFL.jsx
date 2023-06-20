import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CountButton } from "../../components/CountButton/CountButton.jsx";
import { Loader } from "../../components/Loader/Loader.jsx";
import { ScrollToTop } from "../../components/ScrollToTop/ScrollToTop.jsx";

const formSchema = z.object({
  sum: z.coerce
    .number({
      invalid_type_error: "Сумма до налогообложения должна быть числом",
    })
    .positive({ message: "Сумма до налогообложения должна быть больше 0" }),
  beforeOrAfter: z.string(),
  taxesType: z.string(),
});

export function NDFL() {
  const [result, setResult] = useState("");
  const [checked, setChecked] = useState("before");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });

  const handleCheckboxToggle = (e) => {
    setChecked(e.target.value);
  };

  const handleFormSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResult("We are currently working on this feature and will launch soon!");
    }, 2000);
  };

  return (
    <>
      <Row xs={1} md={2} className="mb-4">
        <Col className="mb-5 mb-md-5">
          <h3 className="mb-3 mb-md-5 font-pt-sans-700">Калькулятор НДФЛ</h3>
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <Form.Group key="nds-checkbox" controlId="pays" className="mb-4">
              <Row className="justify-content-xxl-end">
                <Col onChange={handleCheckboxToggle} xxl={7}>
                  <Form.Check
                    name="before"
                    value="before"
                    type="radio"
                    label="Известна сумма до налогообложения"
                    id="ndfl-checkbox-1"
                    checked={checked === "before"}
                    {...register("beforeOrAfter")}
                    className="mb-2"
                  />
                  <Form.Check
                    name="after"
                    value="after"
                    type="radio"
                    label="Известна сумма после налогообложения"
                    id="ndfl-checkbox-2"
                    checked={checked === "after"}
                    {...register("beforeOrAfter")}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-4" controlId="sum">
              <Row className="align-items-center">
                <Col xs={12} xl={5}>
                  <Form.Label className="mb-xl-0">Сумма до налогообложения (руб.):</Form.Label>
                </Col>
                <Col xs={12} xl={7}>
                  <Form.Control type="text" {...register("sum")} />
                </Col>
                {errors?.sum?.message && <p className="text-danger">{errors.sum.message}</p>}
              </Row>
            </Form.Group>
            <Form.Group className="mb-4" controlId="taxesType">
              <Row className="align-items-center">
                <Col xs={12} xl={5}>
                  <Form.Label className="mb-xl-0">Налог:</Form.Label>
                </Col>
                <Col xs={12} xl={7}>
                  <Form.Select aria-label="Налог" {...register("taxesType")}>
                    <option value="podohod">Подоходный налог (13% - 15%)</option>
                    <option value="dividend">Налог на дивиденды (13%)</option>
                    <option value="neresident">НДФЛ для нерезидентов (30%)</option>
                    <option value="victory">Налог на выигрыши (35%)</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            <CountButton disabled={Object.entries(errors).length > 0 || isLoading} color="bg-deep-green" />
          </Form>
        </Col>
        <Col className="mb-5">
          <h3 className="mb-md-4 font-pt-sans-700">Результат</h3>
          <div className="w-100 h-75 p-4 bg-secondary-subtle border border-3 border-secondary min-height">
            {!isLoading && result}
            {isLoading && <Loader />}
          </div>
        </Col>
      </Row>
      <div className="font-pt-sans-400">
        <h3 className="fw-bold">Описание калькулятора</h3>
        <p>Налоговый калькулятор предназначен для расчета налога на доход физических лиц (НДФЛ).</p>
        <div className="border border-3 border-success-subtle p-3 mb-4">
          <p>Калькулятор налогов производит 2 типа расчетов:</p>
          <ul className="ps-3 ps-md-5 mb-0 mb-md-2">
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
        <div className="mb-4">
          <p>К доходам физического лица относятся:</p>
          <ul className="ps-3 ps-md-5 mb-0 mb-md-2">
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
        <div className="border border-4 border-success-subtle rounded-4 p-2 p-sm-3 d-flex align-items-center justify-content-center fw-bold">
          <div>
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
          </div>
          <p className="m-0">С 2021 года для доходов размером выше 5 000 000 рублей введена ставка 15%.</p>
        </div>
      </div>
      <ScrollToTop />
    </>
  );
}
