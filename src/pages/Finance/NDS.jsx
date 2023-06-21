import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CountButton } from "../../components/CountButton/CountButton.jsx";
import { Loader } from "../../components/Loader/Loader.jsx";
import { ScrollToTop } from "../../components/ScrollToTop/ScrollToTop.jsx";
import { nds } from "../../calcs/finance/nds/nds.js";
import { SEO } from "../../components/SEO/SEO.jsx";
import { ThemeContext } from "../../contexts/ThemeContext.jsx";

const formSchema = z.object({
  nb: z.coerce
    .number({
      invalid_type_error: "Сумма должна быть числом",
    })
    .positive({ message: "Сумма должна быть больше 0" }),
  nst: z.coerce
    .number({
      invalid_type_error: "Ставка должна быть числом",
    })
    .positive({ message: "Ставка должна быть больше 0" }),
  action: z.coerce.string(),
});

export function NDS() {
  const [checked, setChecked] = useState("accrue");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [theme] = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });

  const handleCheckboxToggle = (e) => {
    setChecked(e.target.value);
  };

  const handleFormSubmit = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResult(nds(data));
    }, 2000);
  };

  return (
    <>
      <SEO theme={theme} />
      <Row xs={1} md={2} className="mb-4">
        <Col className="mb-5">
          <h3 className="mb-md-5 font-pt-sans-700">Калькулятор НДС</h3>
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <Form.Group className="mb-4" controlId="nb">
              <Form.Label>Сумма:</Form.Label>
              <Form.Control type="text" name="nb" {...register("nb")} />
              {errors?.nb?.message && <p className="text-danger">{errors.nb.message}</p>}
            </Form.Group>
            <Form.Group className="mb-4" controlId="nst">
              <Form.Label>Ставка НДС (%):</Form.Label>
              <Form.Control type="text" name="nst" {...register("nst")} />
              {errors?.nst?.message && <p className="text-danger">{errors.nst.message}</p>}
            </Form.Group>
            <Form.Group key="nds-checkbox" onChange={handleCheckboxToggle} className="mb-4">
              <Form.Check
                name="accrue"
                value="accrue"
                type="radio"
                label="Начислить НДС"
                id="nds-checkbox-1"
                checked={checked === "accrue"}
                {...register("action")}
              />
              <Form.Check
                name="calc"
                value="calc"
                type="radio"
                label="Выделить НДС"
                id="nds-checkbox-2"
                checked={checked === "calc"}
                {...register("action")}
              />
            </Form.Group>
            <CountButton disabled={Object.entries(errors).length > 0 || isLoading} color="bg-deep-green" />
          </Form>
        </Col>
        <Col className="mb-5">
          <h3 className="mb-4 mb-md-5 font-pt-sans-700">Результат</h3>
          <div className="w-100 h-75 p-4 bg-secondary-subtle border border-3 border-secondary min-height">
            {!isLoading && result}
            {isLoading && <Loader />}
          </div>
        </Col>
      </Row>
      <div className="font-pt-sans-400">
        <div className="mb-4">
          <h3 className="font-pt-sans-700">Что такое НДС</h3>
          <p>
            Любой проданный товар или оказанная услуга на территории России облагаются налогом в пользу государства. Это
            и есть НДС. НДС - это косвенный налог, т.к. он ложится на конечного потребителя. В стоимости любого товара,
            который вы покупаете в магазине, уже заложен этот налог. Впервые НДС был введён в 1958 году во Франции и
            сейчас активно применяется в различных странах мира. В России он введен в 1992 году. В Евросоюзе этот налог
            называется VAT (Value Added Tax), а в США этого налога нет, вместо него действует налог с продаж.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="font-pt-sans-700">Какой НДС в России?</h3>
          <p>В настоящее время действуют 3 ставки налога:</p>
          <div className="d-flex flex-column flex-md-row text-center">
            <div>
              <p className="fs-1 font-pt-sans-700 mb-1">20%</p>
              <p className="font-pt-sans-700">Стандартная ставка</p>
              <p>
                Применяется ко всем товарам и услугам, за исключением тех товаров и услуг, к которым применяются
                пониженная и нулевая ставки.
              </p>
            </div>
            <div>
              <p className="fs-1 font-pt-sans-700 mb-1">10%</p>
              <p className="font-pt-sans-700">Сниженная ставка</p>
              <p>
                Продовольственные товары, товары для детей, печатные издания, книжная продукция, медицинские товары.
              </p>
            </div>
            <div>
              <p className="fs-1 font-pt-sans-700 mb-1">0%</p>
              <p className="font-pt-sans-700">Нулевая ставка</p>
              <p>Применяется при реализации товаров, вывезенных в таможенной процедуре экспорта.</p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-pt-sans-700">История НДС в России</h3>
          <Table striped responsive className="table-bordered d-inline-block min-table-width">
            <thead className="font-pt-sans-700">
              <tr>
                <th>Дата</th>
                <th>Изменения</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <td>1 января 1992 года</td>
                <td> Введен налог на добавленную стоимость в размере 28%.</td>
              </tr>
              <tr>
                <td>1993</td>
                <td>Размер налога снижен до 20%</td>
              </tr>
              <tr>
                <td>2004</td>
                <td>Ставка НДС была снижена до 18%</td>
              </tr>
              <tr>
                <td>2019</td>
                <td>Стандартная ставка вновь была повышена до 20%</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div>
          <h3 className="font-pt-sans-700">Вычисление НДС</h3>
          <div className="table-responsive-sm">
            <Table responsive striped className="table-bordered min-table-width">
              <thead className="font-pt-sans-700">
                <tr className="text-center">
                  <th>Как начислить НДС</th>
                  <th>Как выделить НДС</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                <tr>
                  <td className="px-3">
                    Чтобы получить НДС, необходимо сумму без НДС умножить на ставку (например, 18%) и разделить на 100.
                    Чтобы получить сумму с учетом налога сложите сумму без НДС и полученное значение налога.
                  </td>
                  <td className="px-3">
                    Чтобы выделить НДС из суммы, необходимо сумму разделить сумму на (1-НДС/100), из полученного
                    результата вычесть исходную сумму и умножить результат на минус 1.
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </>
  );
}
