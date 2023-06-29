import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CountButton } from "../../components/CountButton/CountButton.jsx";
import { Loader } from "../../components/Loader/Loader.jsx";
import { SEO } from "../../components/SEO/SEO.jsx";
import { ThemeContext } from "../../contexts/ThemeContext.jsx";
import { animationConfig } from "../../../animationConfig.js";
import { formatter } from "../../calcs/tech/convertCSS/convertCSS.js";
import { ScrollToTop } from "../../components/ScrollToTop/ScrollToTop.jsx";

function validateColors(data) {
  if (!data) return false;
  const schema = data[0] === "#" ? "#" : data.match(/^([^(])+/gi)[0];
  if (schema === "rgb") {
    const pattern =
      /^(rgb)?\(?([01]?\d\d?|2[0-4]\d|25[0-5])(\W+)([01]?\d\d?|2[0-4]\d|25[0-5])\W+(([01]?\d\d?|2[0-4]\d|25[0-5])\)?)$/;
    return pattern.test(data);
  }
  if (schema === "#") {
    const pattern = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    return pattern.test(data);
  }
  // if (schema === "hsl") {
  //   const pattern = /\bhsl\((?:\d|[1-9]\d|[1-2]\d{2}|3[0-5]\d|360)(?:, ?(?:[0-9]|[1-9]\d|100)%){2}\)/;
  //   return pattern.test(data);
  // }
  return false;
}

const formSchema = z.object({
  color: z
    .string()
    .trim()
    .refine((data) => validateColors(data), { message: "Введите цветовой код в формате rgb или hex" }),
});

export function ConvertCSS() {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [theme] = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });
  const location = useLocation();

  const handleFormSubmit = (formData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResult(formatter(formData.color));
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
        title="Конвертер цветов"
        name="description"
        content="С помощью конвертера цветов вы можете легко перевести цвет из одной цветовой модели в ряд других."
      />
      <Row xs={1} md={2} className="mb-4">
        <Col className="mb-5">
          <h3 className="mb-md-3 mb-xl-5 font-pt-sans-700">Конвертер цветов</h3>
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <Form.Group className="mb-4">
              <Row className="align-items-center">
                <Col xs={12} xl={4}>
                  <Form.Label>Введите цвет:</Form.Label>
                </Col>
                <Col xs={12} xl={8}>
                  <Form.Control type="text" {...register("color")} />
                </Col>
                {errors?.color?.message && <p className="text-danger">{errors.color.message}</p>}
              </Row>
              <p className="mt-4">Например: rgb(2, 20, 118) или #34cf26</p>
            </Form.Group>
            <CountButton disabled={Object.entries(errors).length > 0 || isLoading} color="bg-deep-green" />
          </Form>
        </Col>
        <Col className="mb-5">
          <h3 className="mb-4 font-pt-sans-700">Результат</h3>
          <div className="w-100 h-75 p-4 bg-secondary-subtle border border-3 border-secondary text-break overflow-y-auto min-height">
            {!isLoading && result && (
              <>
                {result.map((item) => (
                  <p key={item.type}>
                    {item.type}: {item.result}
                  </p>
                ))}
              </>
            )}
            {isLoading && <Loader />}
          </div>
        </Col>
      </Row>
      <div className="font-pt-sans-400">
        <motion.div
          className="mb-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: animationConfig.scrollAnimationDuration }}
        >
          <h3 className="font-pt-sans-700">Цвета в CSS</h3>
          <p>
            Цвета играют жизненно важную роль в формировании внешнего вида веб-страниц. С помощью CSS мы можем управлять
            основным цветом элементов и их фоновым цветом.{" "}
          </p>
          <p>
            Огромная часть работы с цветом — это понимание того, что цвет в мониторах работает не так, как мы привыкли в
            детстве, когда смешивали краски. К примеру, краска и чернила принтера содержат крошечные частицы, —
            пигменты, которые смешиваются друг с другом и отражаются, чтобы представить цвет глазу. Так происходит
            субтрактивное смешивание цветов.
          </p>
          <p>
            Чем больше цветов вы добавляете к исходному цвету, тем темнее он становится, пока не станет коричневым.
            Основные цвета принтера близки к привычным красному, жёлтому, синему, но смешивая цвета субтрактивно вы
            получите коричневый.
          </p>
          <p>
            С другой стороны, на мониторах мы работаем со светом: когда все цвета смешиваются, они образуют белый цвет.
          </p>
        </motion.div>
        <motion.div
          className="mb-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: animationConfig.scrollAnimationDuration }}
        >
          <h3 className="font-pt-sans-700">Именованные цвета</h3>
          <p>
            Технически это не совсем цветовой формат. В HTML доступны 140 именованных цветов. Это специальные ключевые
            слова вроде dodgerblue, hotpink или tomato.
          </p>
          <p>
            Именованные цвета можно использовать, когда вам нужна цветная плашка вместо картинки — например, при
            создании прототипов сайта. Или если вы создаёте обучающие материалы, потому что нет ничего понятнее, чем
            color: red.
          </p>
        </motion.div>
        <motion.div
          className="mb-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: animationConfig.scrollAnimationDuration }}
        >
          <h3 className="font-pt-sans-700">RGB</h3>
          <p>
            Как и большинство цветовых форматов, RGB это аббревиатура, которая означает red green blue (красный,
            зелёный, синий). rgb — наименее абстрактный из всех цветовых форматов в этой статье. Экран вашего компьютера
            или телефона это буквально набор из миллионов маленьких красных, зелёных и синих лампочек, которые
            собираются в пиксели. Формат rgb позволяет нам напрямую регулировать яркость этих лампочек.
          </p>
          <p>
            Каждое значение — красное, зелёное или синее — называется каналом. Значение канала меняется в диапазоне от 0
            до 255. Смешивая эти каналы в разных пропорциях, мы можем создать больше 16 миллионов разных цветов.
          </p>
        </motion.div>
        <motion.div
          className="mb-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: animationConfig.scrollAnimationDuration }}
        >
          <h3 className="font-pt-sans-700">Шестнадцатеричные цветовые значения (HEX)</h3>
          <p>
            Шестнадцатеричный код цвета состоит из шести символов. Например, значение #ffffff представляет белый цвет.
            При описании цветов с использованием шестнадцатеричных значений есть одна особенность, позволяющая, в
            определённых ситуациях, использовать сокращённую запись кода цвета.
          </p>
          <p>
            Дело в том, что если пара значений в описании одного компонента цвета идентична, одно из таких значений
            можно убрать. Каждая пара значений представляет собой описание одного из компонентов цвета. Один байт
            представляет собой число в диапазоне от 00 до FF (в шестнадцатеричной системе счисления) или от 0 до 255 в
            десятичной системе счисления. Первый байт — красный, второй байт — зелёный, а третий байт — синий.
            Шестнадцатеричная система называется так потому, что в ней используется система оснований 16. В качестве
            значений используются диапазоны от 0-9 и от A-F, причём 0 — наименьшее значение, а F — наибольшее, то есть
            #00000 — чёрный, а #FFFFFF — белый.
          </p>
        </motion.div>
        <motion.div
          className="mb-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: animationConfig.scrollAnimationDuration }}
        >
          <h3 className="font-pt-sans-700">HSL</h3>
          <p>
            Цветовая модель HSL (Hue, Saturation, Lightness — тон, насыщенность, светлота), в последнее время стала
            привлекать к себе всё больше внимания со стороны дизайнеров и разработчиков.
          </p>
          <p>
            Значения hsl работают с диапазонами, как и RGB, но вместо того, чтобы работать со значениями,
            соответствующими логике интерпретации монитора, значения hsl — это оттенок, насыщенность, светлота. Похоже
            на значения RGB, но диапазоны отличаются. Эта система основана на колориметрической системе Манселла (он был
            первым, кто разделил цвет на эти три канала, или создал трёхмерную систему, основанную на математических
            принципах, привязанных к человеческому зрению).
          </p>
        </motion.div>
      </div>
      <ScrollToTop />
    </motion.div>
  );
}
