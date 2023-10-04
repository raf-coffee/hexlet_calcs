import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CountButton } from "../../components/CountButton/CountButton.jsx";
import { Loader } from "../../components/Loader/Loader.jsx";
import { ScrollToTop } from "../../components/ScrollToTop/ScrollToTop.jsx";
import { SEO } from "../../components/SEO/SEO.jsx";
import { ThemeContext } from "../../contexts/ThemeContext.jsx";
import { animationConfig } from "../../../animationConfig.js";
import { generatePass } from "../../calcs/tech/genPass/genPass.js";

const formSchema = z.object({
  upperCase: z.boolean(),
  lowerCase: z.boolean(),
  numbers: z.boolean(),
  symbols: z.boolean(),
  excludeAmb: z.boolean(),
  excludeBrackets: z.boolean(),
  noRepeat: z.boolean(),
  passLength: z.coerce
    .number({
      invalid_type_error: "Длинна пароля должна быть числом",
    })
    .min(4, { message: "Длинна пароля должна быть больше 4" })
    .max(50, { message: "Длинна пароля не должна быть больше 50" }),
});

export function PasswordGenerator() {
  const [checked, setChecked] = useState({
    upperCase: true,
    lowerCase: true,
    numbers: true,
    symbols: true,
    excludeAmb: false,
    excludeBrackets: false,
    noRepeat: false,
  });
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });

  const [theme] = useContext(ThemeContext);
  const location = useLocation();

  const handleCheckboxToggle = (e) => {
    setChecked({ ...checked, [e.target.name]: e.target.checked });
  };

  const handleFormSubmit = (data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResult(generatePass(data));
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
        title="Генератор паролей"
        name="description"
        content="Генератор паролей позволит вам за несколько секунд создать пароль."
      />
      <Row xs={1} md={2} className="mb-4">
        <Col className="mb-5">
          <h3 className="mb-md-5 font-pt-sans-700">Генератор паролей</h3>
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <Form.Group className="mb-4" controlId="passLength">
              <Row className="align-items-center">
                <Col xs={12} xl={5}>
                  <Form.Label>Длинна пароля:</Form.Label>
                </Col>
                <Col xs={12} xl={7}>
                  <Form.Control type="text" name="passLength" {...register("passLength")} />
                </Col>
                {errors?.passLength?.message && <p className="text-danger">{errors.passLength.message}</p>}
              </Row>
            </Form.Group>
            <Form.Group key="nds-checkbox" className="mb-4">
              <Form.Check
                name="upperCase"
                type="checkbox"
                label="включить заглавные буквы (A-Z)"
                id="nds-checkbox-1"
                checked={checked.upperCase}
                className="mb-3"
                {...register("upperCase")}
                onChange={handleCheckboxToggle}
              />
              <Form.Check
                name="lowerCase"
                type="checkbox"
                label="включить прописные буквы (a-z)"
                id="nds-checkbox-2"
                checked={checked.lowerCase}
                className="mb-3"
                {...register("lowerCase")}
                onChange={handleCheckboxToggle}
              />
              <Form.Check
                name="numbers"
                type="checkbox"
                label="включить цифры (0-9)"
                id="nds-checkbox-3"
                checked={checked.numbers}
                className="mb-3"
                {...register("numbers")}
                onChange={handleCheckboxToggle}
              />
              <Form.Check
                name="symbols"
                type="checkbox"
                label="включить символы (!\&#x22;#$%&#x26;&#x27;()*+,-./:;&#x3C;=&#x3E;?@[\]^_&#x60;{|}~)"
                id="nds-checkbox-4"
                checked={checked.symbols}
                className="mb-3"
                {...register("symbols")}
                onChange={handleCheckboxToggle}
              />
              <Form.Check
                name="excludeAmb"
                type="checkbox"
                label="исключить похожие символы (iIl1L| o0O &#x60;&#x27;-_&#x22;:;.,)"
                id="nds-checkbox-5"
                checked={checked.excludeAmb}
                className="mb-3"
                {...register("excludeAmb")}
                onChange={handleCheckboxToggle}
              />
              <Form.Check
                name="excludeBrackets"
                type="checkbox"
                label="исключить скобки (&#x3C;&#x3E;()[]{})"
                id="nds-checkbox-6"
                checked={checked.excludeBrackets}
                className="mb-3"
                {...register("excludeBrackets")}
                onChange={handleCheckboxToggle}
              />
              <Form.Check
                name="noRepeat"
                type="checkbox"
                label="исключить повторяющиеся символы"
                id="nds-checkbox-7"
                checked={checked.noRepeat}
                {...register("noRepeat")}
                onChange={handleCheckboxToggle}
              />
            </Form.Group>
            <CountButton color="bg-deep-green" />
          </Form>
        </Col>
        <Col className="mb-5">
          <h3 className="mb-4 font-pt-sans-700">Результат</h3>
          <div className="w-100 h-75 p-4 bg-secondary-subtle border border-3 border-secondary min-height">
            {!isLoading && result && (
              <>
                <p>Пароль: {result.password}</p>
                <p>Энтропия пароля: {result.passwordEntropy.toFixed(1)}</p>
                <p>Сложность пароля: {result.passwordStrength}</p>
              </>
            )}
            {isLoading && <Loader />}
          </div>
        </Col>
      </Row>
      <div className="font-pt-sans-400">
        <h3 className="fw-bold">Описание калькулятора</h3>
        <p>
          Пароль – это набор различных символов, как правило, латинского алфавита, которые могут иметь различный регистр
          (большие, маленькие буквы), дополняться цифрами и знаками препинания.
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: animationConfig.scrollAnimationDuration }}
          className="mb-4"
        >
          <p>
            Генератор случайных паролей – это онлайн-программа, которая создает для вас уникальный пароль в соответствии
            с заданными параметрами. С помощью нашего генератора надежных паролей вы сможете сгенерировать пароль длиной
            от 4 до 50 символов с буквами нижнего и верхнего регистра.
          </p>
          <p />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: animationConfig.scrollAnimationDuration }}
          className="mb-4"
        >
          <p>Чтобы создать пароль онлайн с помощью генератора паролей, необходимо:</p>
          <ul className="ps-3 ps-md-5 mb-0 mb-md-2">
            <li>выбрать длину пароля;</li>
            <li>включить числа;</li>
            <li>включить буквы верхнего и нижнего регистра;</li>
            <li>включить дополнительные символы;</li>
            <li>выбрать количество паролей, которые вы хотите получить;</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: animationConfig.scrollAnimationDuration }}
          className="mb-4"
        >
          <p>
            <span className="fw-bold">Энтропия пароля</span> - это мера надежности пароля или того, насколько надежен
            данный пароль. Это показатель эффективности пароля против атак методом подбора или подбора пароля. Он
            определяет, является ли введенный пароль обычным и легко поддающимся взлому. Он рассчитывается исходя из
            используемого набора символов (нижний алфавит, верхний алфавит, числа, символы и т. Д.) и длины созданного
            пароля. Он выражается в битах энтропии на символ.
          </p>
          <p className="text-center p-4 custom-border custom-border-width-3 rounded bg-white-yellow">
            H = <span className="fst-italic">log</span>
            <sub>2</sub>(R<sup>L</sup>)
          </p>
          <p>Где:</p>
          <ul className="ps-3 ps-md-5 mb-0 mb-md-2">
            <li>H – получаемая энтропия</li>
            <li>R – длина набора символов, используемая в качестве пароля (т.н. «алфавит» для пароля)</li>
            <li>L – число символов в пароле</li>
            <li>
              R<sup>L</sup> – общее число возможных комбинаций пароля
            </li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: animationConfig.scrollAnimationDuration }}
          className="font-pt-sans-400"
        >
          <h3 className="fw-bold">Почему важно иметь надежный пароль</h3>
          <p>
            Надежный пароль – это главный барьер, который мешает взломать большинство ваших аккаунтов в сети. Если вы не
            пользуетесь современными методиками создания паролей, то вполне возможно, что мошенники смогут подобрать их
            буквально за несколько часов. Чтобы не подвергать себя риску кражи идентификационных данных и не стать
            жертвой вымогательства, вам нужно создавать пароли, которые могут противостоять усилиям хакеров, вооруженных
            современными средствами взлома.
          </p>
          <p>
            Слабость вашего аккаунта – это настоящая мечта для киберпреступника. Но этим мечтам лучше никогда не
            сбываться, и поэтому вам нужно предпринять определенные действия, чтобы укрепить стойкость своих паролей.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: animationConfig.scrollAnimationDuration }}
          className="font-pt-sans-400"
        >
          <h3 className="fw-bold">Угрозы безопасности паролей</h3>
          <p>
            Скомпрометированные пароли открывают киберпреступникам доступ к вашим важнейшим личным данным. Так что вам
            нужны такие пароли, которые хакерам нелегко будет угадать или подобрать.
          </p>
          <p>
            Большинство пользователей сейчас умеют создавать пароли, которые тяжело подобрать вручную. Когда-то этого
            было достаточно, чтобы противостоять краже данных. Помните, что преступники будут использовать любую
            информацию о вас, которую смогут найти, а также распространенные способы составления паролей, чтобы угадать
            ваш пароль. Когда-то вы могли использовать простую «хu7р0с7b» – подстановку похожих символов. Но сейчас она
            уже известна хакерам.
          </p>
          <p>
            Современные киберпреступники используют сложные технологии, чтобы украсть ваши пароли. Это очень важно
            знать, потому что многие пытаются составлять пароли, которые трудно отгадать человеку, но не принимают в
            расчет существование эффективных алгоритмов и специальных программ, которые учитывают пользовательские
            «хитрости» при разгадывании паролей.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: animationConfig.scrollAnimationDuration }}
          className="mb-4"
        >
          <p>Методы, которые помогают хакерам проникнуть в ваш аккаунт:</p>
          <ul className="ps-3 ps-md-5 mb-0 mb-md-2">
            <li>
              <span className="fw-bold">Перебор по словарю</span> - использование программы, которая автоматически
              комбинирует распространенные слова из словаря, используя их часто встречающиеся сочетания. Пользователи
              стараются придумывать пароли, которые легко запомнить, так что подобные методы взлома следуют очевидным
              шаблонам.
            </li>
            <li>
              <span className="fw-bold">Данные из социальных сетей и другая раскрытая вами личная информация</span> -
              пользователи часто используют для составления паролей имена и дни рождения, клички домашних животных и
              даже названия любимых спортивных команд. Всю эту информацию очень легко узнать, потратив немного времени
              на изучение ваших аккаунтов в соцсетях.
            </li>
            <li>
              <span className="fw-bold">При брутфорс-атаках</span> используются автоматические программы, перебирающие
              все возможные сочетания символов до тех пор, пока не найдется ваш пароль. В отличие от перебора по
              словарю, брутфорс-алгоритмы с трудом справляются с длинными паролями. А вот короткие пароли в некоторых
              случаях удается подобрать буквально за несколько часов.
            </li>
            <li>
              <span className="fw-bold">Фишинг</span> - это попытка заставить вас самостоятельно отдать мошеннику деньги
              или важную информацию. Мошенники обычно пытаются выдать себя за представителей организаций, которым вы
              доверяете, или даже за ваших знакомых. Они могут позвонить вам по телефону, написать SMS, электронное
              письмо или сообщение в соцсетях. Кроме того, они могут пользоваться поддельными приложениями, сайтами или
              аккаунтами в социальных сетях.
            </li>
            <li>
              <span className="fw-bold">Утечки данных</span> - это еще одна опасность, угрожающая и паролям, и другой
              важной информации. Компании все чаще становятся жертвами взлома; хакеры могут продавать или публиковать
              украденные данные. Утечки данных представляют для вас особенно большую угрозу, если вы используете один и
              тот же пароль в разных местах: весьма вероятно, что ваши старые аккаунты могут быть скомпрометированы, и
              это открывает для злоумышленников доступ и к другим вашим данным.
            </li>
          </ul>
        </motion.div>
      </div>
      <ScrollToTop />
    </motion.div>
  );
}
