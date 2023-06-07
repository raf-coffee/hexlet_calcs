import {useState} from "react";
import {Form, Table} from "react-bootstrap";
import {CountButton} from "../../components/CountButton/CountButton.jsx";

export const Mortgage = () => {
  const [checked, setChecked] = useState("ann");
  const [result, setResult] = useState("");

  const handleCheckboxToggle = (e) => {
    setChecked(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult("This is a result");
  }

  return (
    <div>
      <div className={"container text-start"}>
        <div className={"row mb-4"}>
          <div className={"col-sm mb-5"}>
            <h3 className={"mb-5"}>Ипотечный калькулятор</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className={"mb-4 row"} controlId={"sum"}>
                <div className={"col-4 text-nowrap"}>
                  <Form.Label className={"col-4"}>Стоимость недвижимости</Form.Label>
                </div>
                <div  className={"col-8"} >
                  <Form.Control type={"text"}/>
                </div>
              </Form.Group>
              <Form.Group className={"mb-4 row"} controlId={"firstPay"}>
                <div className={"col-4 text-nowrap"}>
                  <Form.Label>Первоначальный взнос</Form.Label>
                </div>
                <div className={"d-flex col-8"}>
                  <Form.Control type={"text"}/>
                  <Form.Select aria-label="Первоначальный взнос">
                    <option value="ruble">Рубли</option>
                    <option value="percentage">%</option>
                  </Form.Select>
                </div>
              </Form.Group>
              <Form.Group className={"mb-4 row"} controlId={"sumOfLoan"}>
                <div className={"col-4 text-nowrap"}>
                  <Form.Label>Сумма кредита</Form.Label>
                </div>
                <div className={"col-8"}>
                  <Form.Control type={"text"} readOnly={true} />
                </div>
              </Form.Group>
              <Form.Group className={"mb-4 row"} controlId={"creditTerm"}>
                <div className={"col-4 text-nowrap"}>
                  <Form.Label>Срок кредита</Form.Label>
                </div>
                <div className={"d-flex col-8"}>
                  <Form.Control type={"text"}/>
                  <Form.Select aria-label="Срок кредита">
                    <option value="years">лет</option>
                    <option value="months">месяцев</option>
                  </Form.Select>
                </div>
              </Form.Group>
              <Form.Group className={"mb-4 row"} controlId={"interest"}>
                <div className={"text-nowrap col-4"}>
                  <Form.Label>Процентная ставка (%)</Form.Label>
                </div>
                <div className={"col-8"}>
                  <Form.Control type={"text"}/>
                </div>
              </Form.Group>
              <Form.Group key={"nds-checkbox"} controlId={"pays"} className={"d-flex"}>
                <Form.Label className={"me-4"}>Тип ежемесячных платежей</Form.Label>
                <div>
                  <Form.Check name={"ann"} value={"ann"} type={"radio"} label={"Аннуитетные"}
                              id={"nds-checkbox-1"}
                              checked={checked === "ann"} onClick={handleCheckboxToggle}/>
                  <Form.Check name={"diff"} value={"diff"} type={"radio"} label={"Дифференцированные"} id={"nds-checkbox-2"}
                              checked={checked === "diff"} onClick={handleCheckboxToggle}/>
                </div>
              </Form.Group>
              <CountButton color={"bg-deep-green"} />
            </Form>
          </div>
          <div className={"col-sm mb-5"}>
            <h3 className={"mb-5"}>Результат</h3>
            <div className={"w-100 h-75 p-4 bg-secondary-subtle border border-3 border-secondary"}>{result}</div>
          </div>
        </div>
      </div>
      <div className={"container"}>
        <h3 className={"fw-bold mb-3"}>Описание калькулятора</h3>
        <div className={"mb-4 text-start"}>
          <h4>Что такое НДС</h4>
          <p>
            Любой проданный товар или оказанная услуга на территории России облагаются налогом в пользу государства. Это
            и
            есть НДС. НДС - это косвенный налог, т.к. он ложится на конечного потребителя. В стоимости любого товара,
            который вы покупаете в магазине, уже заложен этот налог.

            Впервые НДС был введён в 1958 году во Франции и сейчас активно применяется в различных странах мира. В
            России
            он введен в 1992 году. В Евросоюзе этот налог называется VAT (Value Added Tax), а в США этого налога нет,
            вместо него действует налог с продаж.
          </p>
        </div>
        <div className={"mb-4"}>
          <h4 className={"text-start"}>Какой НДС в России?</h4>
          <p className={"text-start"}>В настоящее время действуют 3 ставки налога:</p>
          <div className={"d-flex flex-column flex-md-row text-center"}>
            <div>
              <p className={"fs-1 fw-bold mb-1"}>20%</p>
              <p className={"fw-bold"}>Стандартная ставка</p>
              <p>Применяется ко всем товарам и услугам, за исключением тех товаров и услуг, к которым применяются
                пониженная и нулевая ставки.</p>
            </div>
            <div>
              <p className={"fs-1 fw-bold mb-1"}>10%</p>
              <p className={"fw-bold"}>Сниженная ставка</p>
              <p>Продовольственные товары, товары для детей, печатные издания, книжная продукция, медицинские
                товары.</p></div>
            <div>
              <p className={"fs-1 fw-bold mb-1"}>0%</p>
              <p className={"fw-bold"}>Нулевая ставка</p>
              <p>Применяется при реализации товаров, вывезенных в таможенной процедуре экспорта.</p></div>
          </div>
        </div>
        <div className={"mb-4 text-start"}>
          <h4>История НДС в России</h4>
          <Table striped responsive className={"table-bordered d-inline-block"} style={{ minWidth: "350px" }}>
            <thead>
            <tr>
              <th>Дата</th>
              <th>Изменения</th>
            </tr>
            </thead>
            <tbody className={"table-group-divider"}>
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
          <h4 className={"text-start"}>Вычисление НДС</h4>
          <div className={"table-responsive-sm"}>
            <Table striped className={"table-bordered"} style={{ minWidth: "400px" }}>
              <thead>
              <tr className={"text-center"}>
                <th>Как начислить НДС</th>
                <th>Как выделить НДС</th>
              </tr>
              </thead>
              <tbody className={"table-group-divider"}>
              <tr>
                <td className={"px-3"}>Чтобы получить НДС, необходимо сумму без НДС умножить на ставку (например, 18%) и разделить на 100.
                  Чтобы получить сумму с учетом налога сложите сумму без НДС и полученное значение налога.
                </td>
                <td className={"px-3"}>Чтобы выделить НДС из суммы, необходимо сумму разделить сумму на (1-НДС/100), из полученного
                  результата вычесть исходную сумму и умножить результат на минус 1.
                </td>
              </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}