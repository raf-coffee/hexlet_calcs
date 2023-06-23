import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ScrollToTop } from "../../components/ScrollToTop/ScrollToTop.jsx";
import { Loader } from "../../components/Loader/Loader.jsx";
import { CountButton } from "../../components/CountButton/CountButton.jsx";
import { SEO } from "../../components/SEO/SEO.jsx";
import { ThemeContext } from "../../contexts/ThemeContext.jsx";
import { animationConfig } from "../../../animationConfig.js";
import { mortgage } from "../../calcs/finance/mortgage/mortgage.js";

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
  creditTerm: z
    .object({
      term: z.coerce
        .number({
          invalid_type_error: "Срок кредита должен быть числом",
        })
        .positive({ message: "Срок кредита должен быть больше 0" }),
      type: z.string(),
    })
    .superRefine((data, ctx) => {
      if (data.type === "years" && data.term > 50) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Срок кредита должен быть меньше 50 лет",
          path: ["term"],
        });
      }
      if (data.type === "months" && data.term > 600) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Срок кредита должен быть меньше 600 месяцев",
          path: ["term"],
        });
      }
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
  const [theme] = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });
  const location = useLocation();

  const handleCheckboxToggle = (e) => {
    setChecked(e.target.value);
  };

  const handleFormSubmit = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResult(mortgage(data));
    }, 1000);
  };

  return (
    <motion.div
      key={location.key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: animationConfig.pageTransitionDuration }}
    >
      <SEO
        theme={theme}
        name="description"
        content="Ипотечный калькулятор используется для рассчёта ключевых условий ипотеки: платежей, суммы, переплаты и сроков."
        title="Ипотечный калькулятор"
      />
      <Row xs={1} md={2} className="mb-4">
        <Col className="mb-5">
          <h3 className="mb-md-5 font-pt-sans-700">Ипотечный калькулятор</h3>
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <Form.Group className="mb-4" controlId="sum">
              <Row className="align-items-center">
                <Col xs={12} xl={5}>
                  <Form.Label className="mb-xl-0">Стоимость недвижимости:</Form.Label>
                </Col>
                <Col xs={12} xl={7}>
                  <Form.Control type="text" {...register("sum")} />
                </Col>
                {errors?.sum?.message && <p className="text-danger">{errors.sum.message}</p>}
              </Row>
            </Form.Group>
            <Form.Group className="mb-4" controlId="firstPay">
              <Row className="align-items-center">
                <Col xs={12} xl={5}>
                  <Form.Label className="mb-xl-0">Первоначальный взнос:</Form.Label>
                </Col>
                <Col xs={12} xl={7}>
                  <Row>
                    <Col xs={7}>
                      <Form.Control type="text" {...register("firstPay.sum")} />
                    </Col>
                    <Col xs={5}>
                      <Form.Select aria-label="Первоначальный взнос" {...register("firstPay.type")}>
                        <option value="ruble">Рубли</option>
                        <option value="percentage">%</option>
                      </Form.Select>
                    </Col>
                  </Row>
                </Col>
                {errors?.firstPay?.sum?.message && <p className="text-danger">{errors.firstPay.sum.message}</p>}
              </Row>
            </Form.Group>
            <Form.Group className="mb-4" controlId="sumOfLoan">
              <Row className="align-items-center">
                <Col xs={7} xl={5}>
                  <Form.Label className="mb-xl-0">Сумма кредита:</Form.Label>
                </Col>
                <Col xs={5} xl={7}>
                  <span className="fw-bold">0</span> рублей
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-4" controlId="creditTerm">
              <Row className="align-items-center">
                <Col xs={12} xl={5}>
                  <Form.Label className="mb-xl-0">Срок кредита:</Form.Label>
                </Col>
                <Col xs={12} xl={7}>
                  <Row>
                    <Col xs={7}>
                      <Form.Control type="text" {...register("creditTerm.term")} />
                    </Col>
                    <Col xs={5}>
                      <Form.Select aria-label="Срок кредита" {...register("creditTerm.type")}>
                        <option value="years">лет</option>
                        <option value="months">месяцев</option>
                      </Form.Select>
                    </Col>
                  </Row>
                </Col>
                {errors?.creditTerm?.term?.message && <p className="text-danger">{errors.creditTerm.term.message}</p>}
              </Row>
            </Form.Group>
            <Form.Group className="mb-4" controlId="interestRate">
              <Row className="align-items-center">
                <Col xs={12} xl={5}>
                  <Form.Label className="mb-xl-0">Процентная ставка (%):</Form.Label>
                </Col>
                <Col xs={12} xl={7}>
                  <Form.Control type="text" {...register("interestRate")} />
                </Col>
                {errors?.interestRate?.message && <p className="text-danger">{errors.interestRate.message}</p>}
              </Row>
            </Form.Group>
            <Form.Group key="nds-checkbox" controlId="payType" className="mb-4">
              <Form.Label className="mb-xl-0 me-4">Тип ежемесячных платежей</Form.Label>
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
        </Col>
        <Col className="mb-5">
          <h3 className="mb-md-4 font-pt-sans-700">Результат</h3>
          <div className="w-100 h-75 p-4 bg-secondary-subtle border border-3 border-secondary min-height">
            {!isLoading && result && (
              <>
                <p>
                  Ежемесячный платёж:{" "}
                  {Array.isArray(result.monthlySum)
                    ? `${result.monthlySum[0].toFixed(2)}...${result.monthlySum[1].toFixed(2)}`
                    : result.monthlySum.toFixed(2)}
                </p>
                <p>Начисленные проценты: {result.percentagesSum.toFixed(2)}</p>
                <p>Общая сумма: {result.generalSum.toFixed(2)}</p>
              </>
            )}
            {isLoading && <Loader />}
          </div>
        </Col>
      </Row>
      <motion.div
        className="font-pt-sans-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: animationConfig.scrollAnimationDuration }}
      >
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
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: animationConfig.scrollAnimationDuration }}
        >
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
        </motion.div>
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: animationConfig.scrollAnimationDuration }}
        >
          <Table responsive className="table-bordered d-inline-block min-table-width">
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
        </motion.div>
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: animationConfig.scrollAnimationDuration }}
        >
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
        </motion.div>
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: animationConfig.scrollAnimationDuration }}
        >
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
        </motion.div>
      </motion.div>
      <ScrollToTop />
    </motion.div>
  );
}
