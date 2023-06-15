import { useState } from "react";
import { Form, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CountButton } from "../../components/CountButton/CountButton.jsx";
import { Loader } from "../../components/Loader/Loader.jsx";

const formSchema = z.object({
  sum: z.coerce
    .number({
      invalid_type_error: "Стоимость недвижимости должна быть числом",
    })
    .positive({ message: "Стоимость недвижимости должна быть больше 0" }),
  firstPay: z.object({
    sum: z.coerce
      .number({
        invalid_type_error: "Первоначальный взнос должен быть числом",
      })
      .positive({ message: "Первоначальный взнос должен быть больше 0" }),
    type: z.string(),
  }),
  creditTerm: z.object({
    term: z.coerce
      .number({
        invalid_type_error: "Срок кредита должен быть числом",
      })
      .positive({ message: "Срок кредита должен быть больше 0" }),
    type: z.string(),
  }),
  interestRate: z.coerce
    .number({
      invalid_type_error: "Процентная ставка должна быть числом",
    })
    .positive({ message: "Процентная ставка должна быть больше 0" }),
  payType: z.string(),
});

export function Mortgage() {
  const [checked, setChecked] = useState("ann");
  const [result, setResult] = useState("");
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
    <div>
      <div className="container text-start">
        <div className="row mb-4">
          <div className="col-sm mb-5">
            <h3 className="mb-5 font-pt-sans-700">Ипотечный калькулятор</h3>
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
              <Form.Group className="mb-4 row" controlId="sum">
                <div className="col-4 text-nowrap">
                  <Form.Label className="col-4">Стоимость недвижимости</Form.Label>
                </div>
                <div className="col-8">
                  <Form.Control type="text" {...register("sum")} />
                </div>
                {errors?.sum?.message && <p className="text-danger">{errors.sum.message}</p>}
              </Form.Group>
              <Form.Group className="mb-4 row" controlId="firstPay">
                <div className="col-4 text-nowrap">
                  <Form.Label>Первоначальный взнос</Form.Label>
                </div>
                <div className="d-flex col-8">
                  <Form.Control type="text" {...register("firstPay.sum")} />
                  <Form.Select aria-label="Первоначальный взнос" {...register("firstPay.type")}>
                    <option value="ruble">Рубли</option>
                    <option value="percentage">%</option>
                  </Form.Select>
                </div>
                {errors?.firstPay?.sum?.message && <p className="text-danger">{errors.firstPay.sum.message}</p>}
              </Form.Group>
              <Form.Group className="mb-4 row" controlId="sumOfLoan">
                <div className="col-4 text-nowrap">
                  <Form.Label>Сумма кредита</Form.Label>
                </div>
                <div className="col-8">
                  <span className="fw-bold">0</span> рублей
                </div>
              </Form.Group>
              <Form.Group className="mb-4 row" controlId="creditTerm">
                <div className="col-4 text-nowrap">
                  <Form.Label>Срок кредита</Form.Label>
                </div>
                <div className="d-flex col-8">
                  <Form.Control type="text" {...register("creditTerm.term")} />
                  <Form.Select aria-label="Срок кредита" {...register("creditTerm.type")}>
                    <option value="years">лет</option>
                    <option value="months">месяцев</option>
                  </Form.Select>
                </div>
                {errors?.creditTerm?.term?.message && <p className="text-danger">{errors.creditTerm.term.message}</p>}
              </Form.Group>
              <Form.Group className="mb-4 row" controlId="interestRate">
                <div className="text-nowrap col-4">
                  <Form.Label>Процентная ставка (%)</Form.Label>
                </div>
                <div className="col-8">
                  <Form.Control type="text" {...register("interestRate")} />
                </div>
                {errors?.interestRate?.message && <p className="text-danger">{errors.interestRate.message}</p>}
              </Form.Group>
              <Form.Group key="nds-checkbox" controlId="payType" className="d-flex">
                <Form.Label className="me-4">Тип ежемесячных платежей</Form.Label>
                <div onChange={handleCheckboxToggle}>
                  <Form.Check
                    name="ann"
                    value="ann"
                    type="radio"
                    label="Аннуитетные"
                    id="nds-checkbox-1"
                    checked={checked === "ann"}
                    {...register("payType")}
                  />
                  <Form.Check
                    name="diff"
                    value="diff"
                    type="radio"
                    label="Дифференцированные"
                    id="nds-checkbox-2"
                    checked={checked === "diff"}
                    {...register("payType")}
                  />
                </div>
              </Form.Group>
              <CountButton disabled={Object.entries(errors).length > 0 || isLoading} color="bg-deep-green" />
            </Form>
          </div>
          <div className="col-sm mb-5">
            <h3 className="mb-4 font-pt-sans-700">Результат</h3>
            <div className="w-100 h-75 p-4 bg-secondary-subtle border border-3 border-secondary">
              {!isLoading && result}
              {isLoading && <Loader />}
            </div>
          </div>
        </div>
      </div>
      <div className="container font-pt-sans-400">
        <h3 className="fw-bold mb-3">Расчет ипотеки онлайн</h3>
        <div className="mb-4">
          <p>
            При намерении купить квартиру или любую другую недвижимость в кредит, было бы нелишним заранее рассчитать
            ежемесячный платеж ипотеки. Зная возможную сумму ежемесячных платежей, потенциальный заемщик с легкостью
            сможет сам рассчитать максимальный размер ипотеки, переплату и срок кредитования.
          </p>
          <p>
            Для точного расчета платежей ипотеки очень удобно использовать специальную программу, доступную каждому, –
            ипотечный калькулятор. Эта программа, которая содержит набор математических формул, используется для
            вычисления всех значимых показателей кредита. Важнейшей функцией программы является расчет ипотеки онлайн. С
            помощью калькулятора заемщик без труда сможет рассчитать все ключевые условия ипотеки: платежи, сумму
            ипотеки, переплату, сроки и другие.
          </p>
          <p>
            Для того, чтобы результат расчета ипотеки, совершаемого на калькуляторе, получился точным, обязательно нужно
            учитывать такие параметры как процентная кредитная ставка, различные платы и комиссии, которые могут иметь
            место, а также доступная для заемщика сумма первоначального взноса. Поэтому не лишним будет уточнить в банке
            информацию по поводу размера процентной ставке и комиссиях по выбранной кредитной программе.
          </p>
          <p>
            Калькулятор ипотеки без труда можно найти в Интернете. Сегодня большинство банков размещают подобную
            программу на своих официальных сайтах. Эти сервисы на сайтах банков помогают рассчитать ипотеку и актуальные
            для каждого конкретного заемщика условия кредита – индивидуальную процентную ставку, выплаты и др. В таких
            сервисах, обычно, уже учтены категория заемщика, тип покупаемого жилья, возможность подключения программы
            страхования или же отказаться от нее, подходящую кредитную программу.
          </p>
          <p>
            Существуют онлайн-калькуляторы, рассчитывающие размер ипотеки, размещенные не только на сайтах банков, но и
            на других интернет-порталах, специализирующихся на таких услугах. Такие калькуляторы также без проблем
            рассчитают условия кредита по параметрам, заданным пользователем. Онлайн-калькуляторы дают заемщикам
            прекрасную возможность не посещая банк лично предварительно рассчитать все интересующие их параметры.
          </p>
          <p>
            Однако, не стоит забывать, что результат расчета, полученного на сервисах, которые расположены на сторонних
            сайтах, не будет окончательным. Для получения профессиональной консультации и точного расчета ипотеки на
            недвижимость можно обратиться к менеджеру непосредственно в банке. Ипотечный калькулятор – удобный сервис,
            дающий возможность для тех, кто планирует приобрести жилье в кредит, предварительно оценить свои возможности
            чтобы понять степень долговременной кредитной нагрузки.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="fw-bold">Процентная ставка</h3>
          <p>
            Процентная ставка - очень важный параметр при рассчете ипотеки. Измеряется в процентах годовых. Этот
            параметр показывает сколько процентов начисляется на ваш долг в год. Для наглядности возьмем конкретное
            значение процентной ставки - 12%. Это значит, что в год к вашему долгу прибавляется ещё 12% от суммы долга,
            НО: при ипотечном кредитовании банк начисляет вам проценты не раз в год, а ежедневно на оставшуюся сумму
            долга. Не трудно посчитать сколько процентов начисляется каждый день: 12% / 12 месяцев / 30 дней = 0.033%.
          </p>
          <p>
            Если вы уже воспользовались нашим ипотечным калькулятором и сделали расчет, вы, наверное заметили, что
            ежемесячный платеж состоит из двух частей: основной долг и проценты. Поскольку с каждым месяцем ваш долг
            уменьшается, то и процентов начисляется меньше. Именно поэтому первая часть платежа (основной долг) растет,
            а вторая (проценты) уменьшается, а общий размер платежа остается неизменным на протяжении все срока.
          </p>
          <p>
            Разные банки предлагают разные процентные ставки, они зависят от различных условий, например, от размера
            первоначального взноса, от типа приобретаемого жилья и т.п. Очевидно, что нужно искать вариант с наименьшей
            ставкой, ведь даже разница в пол процента отразиться на сумме ежемесячного платежа и на общей переплате по
            кредиту:
          </p>
        </div>
        <div className="mb-4">
          <Table responsive className="table-bordered d-inline-block" style={{ minWidth: "350px" }}>
            <caption className="caption-top">
              Таблица 1. Демонстрация влияния процентной ставки на параметры кредита.
            </caption>
            <thead>
              <tr className="table-secondary">
                <th>Сумма кредита</th>
                <th>2 000 000</th>
                <th>2 000 000</th>
                <th>2 000 000</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <td>Срок кредита</td>
                <td>10 лет</td>
                <td>10 лет</td>
                <td>10 лет</td>
              </tr>
              <tr className="fw-bold">
                <td>Процентная ставка</td>
                <td>12%</td>
                <td>12,5%</td>
                <td>13%</td>
              </tr>
              <tr>
                <td>Ежемесячный платеж (руб.)</td>
                <td>28 694</td>
                <td>29 275</td>
                <td>29 862</td>
              </tr>
              <tr>
                <td>Переплата по кредиту (руб.)</td>
                <td>1 443 303</td>
                <td>1 513 028</td>
                <td>1 583 458</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="mb-4">
          <h3 className="fw-bold">Фиксированная и плавающая процентная ставка</h3>
          <p>
            <span className="fw-bold">Фиксированная процентная ставка</span> - это ставка по кредиту, которая
            устанавливается на весь срок кредита. Она прописана в кредитном договоре и не может быть изменена.
          </p>
          <p>
            <span className="fw-bold">Плавающая процентная ставка</span> - это ставка по кредиту, которая не является
            постоянной величиной, а рассчитывается по формуле, которая определена в договоре. Размер ставки состоит из
            двух частей: Первая составляющая - плавающая, привязана к какому либо рыночному индикатору (ставка
            рефинансирования ЦБ) и изменяется с периодичностью, определенной в кредитном договоре (например, ежемесячно,
            ежеквартально или раз в полгода). Вторая составляющая, фиксированная - это процент, который берет себе банк.
            Эта часть остается всегда постоянной.
          </p>
        </div>
        <div className="mb-4">
          <h3 className="fw-bold">Аннуитетный и дифференцированный платеж</h3>
          <p>
            <span className="fw-bold">Аннуитетный платеж</span> – вариант ежемесячного платежа по кредиту, когда размер
            ежемесячного платежа остаётся постоянным на всём периоде кредитования.
          </p>
          <p>
            <span className="fw-bold">Дифференцированный платеж</span> – вариант ежемесячного платежа по кредиту, когда
            размер ежемесячного платежа по погашению кредита постепенно уменьшается к концу периода кредитования.
          </p>
          <p>В настоящее время наиболее распространен аннуитетный платеж.</p>
        </div>
      </div>
    </div>
  );
}
