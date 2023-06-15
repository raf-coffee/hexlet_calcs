import { useState } from "react";
import { Form, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CountButton } from "../../components/CountButton/CountButton.jsx";
import { KeyRateChart } from "../../components/KeyRateChart/KeyRateChart.jsx";
import { Loader } from "../../components/Loader/Loader.jsx";
import annuitet from "../../assets/images/payment_annuitet.webp";
import diff from "../../assets/images/payment_diff.webp";

const formSchema = z.object({
  variants: z.coerce.string(),
  sum: z.coerce
    .number({
      invalid_type_error: "Сумма кредита должна быть числом",
    })
    .positive({ message: "Сумма кредита должна быть больше 0" }),
  monthlyPay: z.coerce
    .number({
      invalid_type_error: "Ежемесячный платёж должен быть числом",
    })
    .positive({ message: "Ежемесячный платёж должен быть больше 0" }),
  interestRate: z.coerce
    .number({
      invalid_type_error: "Процентная ставка должна быть числом",
    })
    .positive({ message: "Процентная ставка должна быть больше 0" }),
});

export function Loan() {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });

  const handleFormSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResult("We are currently working on this feature and will launch soon!");
    }, 2000);
  };

  return (
    <>
      <div className="container">
        <div className="row mb-4">
          <div className="col-sm mb-5">
            <h3 className="mb-5 font-pt-sans-700">Кредитный калькулятор</h3>
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
              <Form.Group className="mb-4 row" controlId="variants">
                <div className="col-4 text-nowrap">
                  <Form.Label>Вариант расчета</Form.Label>
                </div>
                <div className="col-8">
                  <Form.Select aria-label="Вариант расчета" {...register("variants")}>
                    <option value="monthly">Расчёт ежемесячного платежа</option>
                    <option value="term">Расчёт срока кредита</option>
                    <option value="maxSum">Расчёт максимальной суммы кредиты</option>
                  </Form.Select>
                </div>
              </Form.Group>
              <Form.Group className="mb-4 row" controlId="sum">
                <div className="col-4 text-nowrap">
                  <Form.Label className="col-4">Сумма кредита (руб.)</Form.Label>
                </div>
                <div className="col-8">
                  <Form.Control type="text" {...register("sum")} />
                </div>
                {errors?.sum?.message && <p className="text-danger">{errors.sum.message}</p>}
              </Form.Group>
              <Form.Group className="mb-4 row" controlId="monthlyPay">
                <div className="col-4 text-nowrap">
                  <Form.Label>Ежемесячный платеж (руб.)</Form.Label>
                </div>
                <div className="col-8">
                  <Form.Control type="text" {...register("monthlyPay")} />
                </div>
                {errors?.monthlyPay?.message && <p className="text-danger">{errors.monthlyPay.message}</p>}
              </Form.Group>
              <Form.Group className="mb-4 row" controlId="interestRate">
                <div className="col-4 text-nowrap">
                  <Form.Label>Процентная ставка (%)</Form.Label>
                </div>
                <div className="col-8">
                  <Form.Control type="text" {...register("interestRate")} />
                </div>
                {errors?.interestRate?.message && <p className="text-danger">{errors.interestRate.message}</p>}
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
        <h3 className="font-pt-sans-700">Описание калькулятора</h3>
        <div className="border border-3 border-success-subtle p-3 mb-4">
          <p>Кредитный калькулятор осуществляет 3 типа расчетов:</p>
          <ul>
            <li>
              <span className="fw-bold">Классический</span> - нахождение ежемесячного платежа по заданной сумме и сроку
              кредита. Такой расчет производят банки при выдаче кредитов.
            </li>
            <li>
              <span className="fw-bold">Вычисление срока кредита на основе заданной суммы и ежемесячного платежа</span>{" "}
              - этот вариант интересен тем, что поможет спрогнозировать точный срок возврата кредита при наличии у
              заемщика конкретных пожеланий к ежемесячному платежу.
            </li>
            <li>
              <span className="fw-bold">
                Расчет максимальной суммы кредита по заданному сроку и ежемесячному платежу
              </span>{" "}
              - если вы точно знаете, какую сумму и в течение какого времени вы готовы отдавать каждый месяц на
              погашение кредита, калькулятор сообщит вам, сколько денег вы сможете занять на таких условиях.
            </li>
          </ul>
        </div>
        <p>
          Кредитование населения является неотъемлимой частью экономики любой страны. Возможность кредитования повышает
          спрос на товары и услуги, что является стимулом развития экономики.
        </p>
        <p>
          Раз вы находитесь на этой странице, значит вы как минимум задумываетесь о получения кредита. Наш калькулятор
          послужит вам помощником в предварительном расчете.
        </p>
        <p className="fw-bold">
          Кредитный калькулятор - это удобный инструмент для быстрого самостоятельного расчета кредита онлайн.
        </p>
        <p className="mb-5">
          Калькулятор универсален. Не имеет значения, в каком банке вы будете брать кредит. Не имеет значение и тип
          займа: потребительский кредит, ипотека, кредит наличными. Результат всегда будет достаточно точным.
        </p>
        <div className="mb-5">
          <h3 className="font-pt-sans-700">Что такое процентная ставка и от чего она зависит?</h3>
          <p>
            Процентая ставка — самый важный параметр при расчете кредита. Измеряется в процентах годовых. Он показывает
            сколько процентов начисляется на сумму долга за 1 год. Но фактически проценты начисляются не один раз в год,
            а ежедневно в размере ставки, разделенной на 365 дней.
          </p>
          <p>У каждого банка есть свои программы кредитования и свои процентные ставки.</p>
        </div>
        <div className="mb-5">
          <h3 className="font-pt-sans-700">Основные факторы, влияющие на процентную ставку:</h3>
          <ol>
            <li>
              <span className="fw-bold">Ключевая ставка Центробанка</span> - чтобы дать вам кредит, банк занимает у ЦБ
              по ставке, равной ключевой, накидывает еще несколько процентов сверху и дает вам в долг под более высокий
              процент, зарабатывая на разнице. Выгоднее брать кредит, когда ключевая ставка ниже: вы заплатите меньше
              процентов. На каждом очередном заседании ЦБ может как повысить, так и понизить ставку или оставить без
              изменений. Это решение принимается в зависимости от экономической ситуации.
              <p>Вот так ключевая ставка она менялась за последние годы:</p>
              <KeyRateChart />
            </li>
            <li className="mt-4">
              <span className="fw-bold">Тип кредита</span> - чем больше риска несет кредит для банка, тем он дороже.
              Например, ипотечный кредит дешевле потребительского кредита или кредита наличными. Причина проста — при
              выдаче ипотеки банк берет в залог недвижимость, невелируя этим риски невыплаты кредита. При выдаче кредита
              наличными на любые цели у банка нет способа гарантировать возврат, поэтому ставка гораздо выше.
            </li>
            <li>
              <span className="fw-bold">Характиристики заемщика</span> - среди них кредитная история и отношения с
              банком. Кредитные организации оценивают надежность потенциальных заемщиков и делают более выгодные
              персональные предложения потенциальным клиентам, в надежности которых они уверены. Своим зарплатным
              клиентам многие банки предоставляют скидку в размере 0.3 - 0.6 процентных пункта.
            </li>
          </ol>
        </div>
        <div className="mb-5">
          <h3 className="font-pt-sans-700">Аннуитетный и дифференцированный платеж</h3>
          <p>
            Что такое аннуитетный и дифференцированный платеж? В чем разница между ними? Какой из них выгоднее для
            заемщика?
          </p>
          <div className="container text-center">
            <div className="row justify-content-evenly">
              <div className="col-5 border border-2 border-secondary-subtle p-3">
                <h4>Аннуитетный</h4>
                <p className="p-2">Равные ежемесячные суммы на протяжении всего срока кредитования.</p>
                <Image src={annuitet} fluid />
                <p className="border-bottom border-2 border-secondary p-2">
                  Доля процентов и доля основного долга в каждом месяце рассчитываются таким образом, чтобы общая сумма
                  была неизменной.
                </p>
                <p className="border-bottom border-2 border-secondary p-2">
                  Аннуитетный платеж более распространен за счет удобства выплаты. Платить каждый месяц одну и ту же
                  сумму логичнее и проще для учета финансов.
                </p>
                <p className="border-bottom border-2 border-secondary p-2">
                  Переплата по кредиту выше, чем при дифференцированном платеже.
                </p>
              </div>
              <div className="col-5 border border-2 border-secondary-subtle p-3">
                <h4>Дифференцированный</h4>
                <p className="p-2">Сумма ежемесячного платежа уменьшается к концу срока кредитования.</p>
                <Image src={diff} fluid />
                <p className="border-bottom border-2 border-secondary p-2">
                  Доля основного долга остается неизменной, а доля процентов с каждым месяцем уменьшается, так как
                  уменьшается общая сумма долга.
                </p>
                <p className="border-bottom border-2 border-secondary p-2">
                  Ежемесячные платежи вначале срока выше по сравнению с аннуитетом, поэтому выше требования к
                  платежеспоособности клиента.
                </p>
                <p className="border-bottom border-2 border-secondary p-2">
                  Дифференцированный платеж выгоднее, сумма переплаты ниже.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
