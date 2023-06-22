import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CountButton } from "../../components/CountButton/CountButton.jsx";
import { Loader } from "../../components/Loader/Loader.jsx";
import { ScrollToTop } from "../../components/ScrollToTop/ScrollToTop.jsx";
import { bodyType } from "../../calcs/health/bodyType/bodyType.js";
import { ThemeContext } from "../../contexts/ThemeContext.jsx";
import { SEO } from "../../components/SEO/SEO.jsx";

const formSchema = z.object({
  height: z.coerce
    .number({
      invalid_type_error: "Рост должен быть числом",
    })
    .positive({ message: "Рост должен быть больше 0" }),
  weight: z.coerce
    .number({
      invalid_type_error: "Вес должен быть числом",
    })
    .positive({ message: "Вес должен быть больше 0" }),
  bust: z.coerce
    .number({
      invalid_type_error: "Обхват груди должен быть числом",
    })
    .positive({ message: "Обхват груди должен быть больше 0" }),
  carpus: z.coerce
    .number({
      invalid_type_error: "Обхват запястья должен быть числом",
    })
    .positive({ message: "Обхват запястья должен быть больше 0" }),
  sex: z.coerce.string(),
});

export function BodyType() {
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [theme] = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });

  const handleFormSubmit = (formData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResult(bodyType(formData));
    }, 2000);
  };

  return (
    <>
      <SEO
        theme={theme}
        title="Тип теплосложения - онлайн калькулятор"
        name="description"
        content="Калькулятор типа телосложения поможет понять свой тип телосложения и определить, какие изменения в образе жизни необходимы для достижения лучших результатов."
      />
      <Row xs={1} md={2} className="mb-4">
        <Col className="mb-4">
          <h3 className="mb-md-5 font-pt-sans-700">Калькулятор типа телосложения</h3>
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <Form.Group className="mb-4" controlId="height">
              <Row className="align-items-center">
                <Col xs={12} xl={5}>
                  <Form.Label className="mb-xl-0">Рост (см):</Form.Label>
                </Col>
                <Col xs={12} xl={7}>
                  <Form.Control type="text" name="height" {...register("height")} />
                </Col>
                {errors?.height?.message && <p className="text-danger">{errors.height.message}</p>}
              </Row>
            </Form.Group>
            <Form.Group className="mb-4" controlId="weight">
              <Row className="align-items-center">
                <Col xs={12} xl={5}>
                  <Form.Label className="mb-xl-0">Вес (кг):</Form.Label>
                </Col>
                <Col xs={12} xl={7}>
                  <Form.Control type="text" name="weight" {...register("weight")} />
                </Col>
                {errors?.weight?.message && <p className="text-danger">{errors.weight.message}</p>}
              </Row>
            </Form.Group>
            <Form.Group className="mb-4" controlId="age">
              <Row className="align-items-center">
                <Col xs={12} xl={5}>
                  <Form.Label className="mb-xl-0">Обхват груди (см):</Form.Label>
                </Col>
                <Col xs={12} xl={7}>
                  <Form.Control type="text" name="bust" {...register("bust")} />
                </Col>
                {errors?.bust?.message && <p className="text-danger">{errors.bust.message}</p>}
              </Row>
            </Form.Group>
            <Form.Group className="mb-4" controlId="wrist">
              <Row className="align-items-center">
                <Col xs={12} xl={5}>
                  <Form.Label className="mb-xl-0">Обхват запястья (см):</Form.Label>
                </Col>
                <Col xs={12} xl={7}>
                  <Form.Control type="text" name="carpus" {...register("carpus")} />
                </Col>
                {errors?.carpus?.message && <p className="text-danger">{errors.carpus.message}</p>}
              </Row>
            </Form.Group>
            <Form.Group className="mb-4" controlId="sex">
              <Row className="align-items-center">
                <Col xs={12} xl={5}>
                  <Form.Label className="mb-xl-0">Пол</Form.Label>
                </Col>
                <Col xs={12} xl={7}>
                  <Form.Select aria-label="Пол" name="sex" {...register("sex")}>
                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            <CountButton disabled={Object.entries(errors).length > 0 || isLoading} color="bg-deep-green" />
          </Form>
        </Col>
        <Col className="mb-4">
          <h3 className="mb-md-4 font-pt-sans-700">Результат</h3>
          <div className="w-100 h-75 p-4 bg-secondary-subtle border border-3 border-secondary min-height">
            {!isLoading && result && (
              <>
                <p>Тип телосложения:</p>
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
        <div className="mb-5">
          <h3 className="font-pt-sans-700">Что такое тип телосложения?</h3>
          <p>
            Тип телосложения (соматотип) ─ это пропорции частей тела человека в сочетании с индивидуальными
            особенностями развития костной, жировой и мышечной тканей. Размеры и формы тела каждого человека могут
            существенно различаться у разных людей и в значительной степени генетически запрограммированы. Эта программа
            реализуется в ходе естественных морфологических, физиологических и биохимических трансформаций организма в
            течение всей жизни человека.
          </p>
        </div>
        <div className="mb-5">
          <h3 className="font-pt-sans-700">Индекс Пинье</h3>
          <p>
            Был предложен в 1901 году Морисом–Шарлем–Жозефом Пинье. Чем меньше цифры индекса, тем организм считается
            крепче.
          </p>
          <p>
            В пожилом возрасте средние значения индекса меньше, в юношеском и детском - больше. Этот индекс был положен
            в основу схемы соматотипирования по М.В. Черноруцкому.
          </p>
          <p>Индекс Пинье рассчитывается по формуле:</p>
          <p className="text-center p-4 text-uppercase custom-border custom-border-width-3 rounded bg-white-yellow">
            Рост в см - (вес в кг + окружность груди в см)
          </p>
        </div>
        <div className="mb-5">
          <h3 className="font-pt-sans-700">Индекс Рорера</h3>
          <p>
            Индекс Рорера (коэффициент упитанности), характеризует относительную плотность тела. Был впервые предложен в
            1921 году в качестве "показателя полноты" швейцарским врачом Фрицем Рорером.
          </p>
          <p>Индекс Рорера рассчитывается по формуле:</p>
          <p className="text-center p-4 text-uppercase custom-border custom-border-width-3 rounded bg-white-yellow">
            Масса тела в кг / (Рост в м)<sup>3</sup>
          </p>
        </div>
        <div className="mb-5">
          <h3 className="font-pt-sans-700">Индекс Соловьева</h3>
          <p>
            Индекс Соловьёва используется для вычисления нормального веса с учетом трех типов телосложения человека.
            Чтобы вычислить этот параметр, нужно с помощью мерной ленты или другого приспособления наподобие рулетки
            измерить длину окружности запястья в его наиболее тонком месте, возле кисти. Этот показатель позволяет
            установить тип телосложения, параметры тела человека, его пропорциональность и конституцию. Индекс Соловьева
            нужно обязательно учитывать, анализируя физическое состояние человека.
          </p>
          <div>
            <p>Различают 3 типа телосложения, которые непосредственным образом влияют на форму тела человека:</p>
            <ul>
              <li>
                астеническое телосложение - женщины с окружностью запястья менее 15 см и мужчины с окружностью запястья
                менее 18 см;
              </li>
              <li>
                нормостеническое телосложение - женщины с окружностью запястья от 15 см до 17 см и мужчины с окружностью
                запястья от 18 см до 20 см;
              </li>
              <li>
                гиперстеническое телосложение - женщины с окружностью запястья более 17 см и мужчины с окружностью
                запястья более 20 см.
              </li>
            </ul>
          </div>
        </div>
        <div className="mb-5">
          <h3 className="font-pt-sans-700">Индекс Соловьева при беременности</h3>
          <p>
            Толщина костей также является важным параметром для врачей-акушеров при диагностике беременных. Поэтому в
            этой сфере также используется индекс Соловьёва, который помогает определить уровень сужения малого таза
            будущей мамы. В данном случае нормой считается окружность запястья от 14 до 16 см. Врач замеряет обхват
            большого таза и вычитает из этого числа 9 сантиметров. Таким образом вычисляется размер малого таза. Если же
            окружность запястья беременной меньше 14 см, то из обхвата таза вычитают не 9, а 8 см (поскольку кости
            тоньше). А когда окружность запястья превышает 16 см, то из обхвата большого таза отнимают 10 см.
          </p>
        </div>
        <p>
          Калькулятор типа телосложения может быть полезен для людей, которые стремятся к улучшению своего здоровья и
          желают следить за своим весом. Данный калькулятор поможет пользователю понять свой тип телосложения и
          определить, какие изменения в образе жизни необходимы для достижения лучших результатов.
        </p>
      </div>
      <ScrollToTop />
    </>
  );
}
