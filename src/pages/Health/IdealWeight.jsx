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
import { perfect } from "../../calcs/health/perfectWeight/perfectWeight.js";

const formSchema = z.object({
  height: z.coerce
    .number({
      invalid_type_error: "Рост должен быть числом",
    })
    .positive({ message: "Рост должен быть больше 0" }),
  bust: z.coerce
    .number({
      invalid_type_error: "Обхват груди должен быть числом",
    })
    .positive({ message: "Обхват груди должен быть больше 0" }),
  sex: z.coerce.string(),
});

export function IdealWeight() {
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });

  const handleFormSubmit = (data) => {
    const { height, bust, sex } = data;
    setIsLoading(true);
    setTimeout(() => {
      setResult(perfect(sex, height, bust));
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <Row xs={1} md={2} className="mb-4">
        <Col className="mb-5">
          <h3 className="mb-md-4 mb-lg-5 font-pt-sans-700">Калькулятор идеального веса</h3>
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <Form.Group className="mb-4" controlId="height">
              <Row className="align-items-center">
                <Col xs={12} xl={5}>
                  <Form.Label className="mb-xl-0">Рост (см):</Form.Label>
                </Col>
                <Col xs={12} xl={7}>
                  <Form.Control type="text" {...register("height")} />
                </Col>
                {errors?.height?.message && <p className="text-danger">{errors.height.message}</p>}
              </Row>
            </Form.Group>
            <Form.Group className="mb-4" controlId="bust">
              <Row className="align-items-center">
                <Col xs={12} xl={5}>
                  <Form.Label className="mb-xl-0">Обхват груди (см):</Form.Label>
                </Col>
                <Col xs={12} xl={7}>
                  <Form.Control type="text" {...register("bust")} />
                </Col>
                {errors?.bust?.message && <p className="text-danger">{errors.bust.message}</p>}
              </Row>
            </Form.Group>
            <Form.Group className="mb-4 row" controlId="sex">
              <Col xs={12} xl={5}>
                <Form.Label className="mb-xl-0">Пол:</Form.Label>
              </Col>
              <Col xs={12} xl={7} {...register("sex")}>
                <Form.Select aria-label="Пол">
                  <option value="male">Мужской</option>
                  <option value="female">Женский</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <CountButton disabled={Object.entries(errors).length > 0 || isLoading} color="bg-deep-green" />
          </Form>
        </Col>
        <Col className="mb-5">
          <h3 className="mb-4 mb-md-5 mb-xl-4 font-pt-sans-700">Результат</h3>
          <div
            className={`w-100 ${
              result ? "h-auto" : "h-75"
            } px-4 pt-4 pb-2 bg-secondary-subtle border border-3 border-secondary`}
          >
            {!isLoading && result && (
              <>
                {Object.values(result).map((value) => (
                  <p key={value}>{value}</p>
                ))}
              </>
            )}
            {isLoading && <Loader />}
          </div>
        </Col>
      </Row>
      <div className="font-pt-sans-400">
        <h3 className="fw-bold mb-3">Описание калькулятора</h3>
        <p>
          Калькулятор веса поможет вам определить идеальный вес исходя из вашего реального роста. Благодаря полученным
          данным вы сможете узнать стоит ли вам сбросить лишние килограммы или же наоборот набрать полезную массу тела.
        </p>
        <p>
          Для характеристики физического развития ребенка применяют измерение антропометрических параметров и индексы
          физического развития – формулы, которые выражают уровень физического развития на основании определенных
          антропометрических параметров. Основными антропометрическими параметрами являются масса тела, длина тела и
          окружность грудной клетки. При использовании метода индексов в состав формул могут входить такие
          антропометрические показатели, как диаметры и окружности тела.
        </p>
        <div className="mb-5">
          <h3 className="font-pt-sans-700">Индекс Борнгардта</h3>
          <p>Индекс Борнгардта (1886 год) - индекс, использующий окружность груди в формуле расчета идеального веса.</p>
          <p className="text-center p-4 text-uppercase border border-3 border-warning rounded bg-white-yellow">
            Идеальный вес = Рост * Обхват груди / 240
          </p>
        </div>
        <div className="mb-5">
          <h3 className="font-pt-sans-700">Индекс Ноордена</h3>
          <p>
            Разработан диетологом Ноорденом, в начале XX века. Одна из редких формул нормального веса, которая не
            основана на индексе Брока.
          </p>
          <p className="text-center p-4 text-uppercase border border-3 border-warning rounded bg-white-yellow">
            Идеальный вес = Рост * 420 / 1000
          </p>
        </div>
        <div className="mb-5">
          <h3 className="font-pt-sans-700">Индекс Татоня</h3>
          <p className="text-center p-4 text-uppercase border border-3 border-warning rounded bg-white-yellow">
            Идеальный вес = Рост - (100 + (Рост - 100) / 20)
          </p>
        </div>
        <div className="mb-5">
          <h3 className="font-pt-sans-700">Индекс Девина</h3>
          <p>
            Формула, предложена доктором Дивайном (Devine) в 1974 году. Первоначально формула, учитывая ее точность,
            использовалась в медицинских целях для расчета дозы препаратов. В последующем распространилась значительно
            более широко.
          </p>
          <p>Формула Девина для женщин:</p>
          <p className="text-center p-4 text-uppercase border border-3 border-warning rounded bg-white-yellow">
            Идеальный вес = 45.5 + 2.3 * (0.394 * рост - 60)
          </p>
          <p>Формула Девина для мужчин:</p>
          <p className="text-center p-4 text-uppercase border border-3 border-warning rounded bg-white-yellow">
            Идеальный вес = 50 + 2.3 * (0.394 * рост - 60)
          </p>
        </div>
        <div className="mb-5">
          <h3 className="font-pt-sans-700">Индекс Брока</h3>
          <p>
            Формула для определения идеального веса была разработана в 1871 году французским хирургом и антропологом
            Полем Брока. Формула подходит для людей выше 155 и ниже 185 сантиметров среднего телосложения. Это
            уточненнное определение для первой его известной формуы (рост минус 100)
          </p>
          <p>Индекс Брока для женщин:</p>
          <p className="text-center p-4 text-uppercase border border-3 border-warning rounded bg-white-yellow">
            Идеальный вес = (Рост - 100) * 0,85
          </p>
          <p>Индекс Брока для мужчин:</p>
          <p className="text-center p-4 text-uppercase border border-3 border-warning rounded bg-white-yellow">
            Идеальный вес = (Рост - 100) * 0,9
          </p>
        </div>
        <div className="mb-5">
          <h3 className="font-pt-sans-700">Формула Лоренца</h3>
          <p className="text-center p-4 text-uppercase border border-3 border-warning rounded bg-white-yellow">
            Идеальный вес = Рост - 100 - ((Рост - 150) / 2)
          </p>
        </div>
        <p>
          Конечно же, полученные данные являются среднестатистическими, поскольку каждый организм человека уникальный, у
          каждого он функционирует совершенно по разному. Кроме того система не принимает во внимание питание и образ
          жизни человека. Однако, калькулятор веса позволит вам узнать приблизительный показатель идеального веса с той
          целью, чтобы вы в своей жизни смогли, по возможности, держаться как можно ближе своего полезного веса.
        </p>
      </div>
      <ScrollToTop />
    </>
  );
}
