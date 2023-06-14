import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Table } from "react-bootstrap";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { WeightChart } from "../../components/WeightChart/WeightChart.jsx";
import { CountButton } from "../../components/CountButton/CountButton.jsx";
import { imt } from "../../calcs/health/imt/imt.js";

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
});

export const IMT = () => {
  const [result, setResult] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });

  const handleFormSubmit = (e) => {
    setResult(imt(e.height, e.weight));
  };

  return (
    <>
      <div className={"container text-start"}>
        <div className={"row mb-4"}>
          <div className={"col-sm mb-5"}>
            <h3 className={"mb-5"}>Калькулятор индекса массы тела</h3>
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
              <Form.Group className={"mb-4 row"} controlId={"height"}>
                <div className={"col-4"}>
                  <Form.Label>Рост</Form.Label>
                </div>
                <div className={"col-8"}>
                  <Form.Control type={"text"} name={"height"} {...register("height")} />
                </div>
                {errors?.height?.message && <p className={"text-danger"}>{errors.height.message}</p>}
              </Form.Group>
              <Form.Group className={"mb-4 row"} controlId={"weight"}>
                <div className={"col-4"}>
                  <Form.Label className={"col-4"}>Вес</Form.Label>
                </div>
                <div className={"col-8"}>
                  <Form.Control type={"text"} name={"weight"} {...register("weight")} />
                </div>
                {errors?.weight?.message && <p className={"text-danger"}>{errors.weight.message}</p>}
              </Form.Group>
              <CountButton disabled={Object.entries(errors).length > 0} color={"bg-deep-green"} />
            </Form>
          </div>
          <div className={"col-sm mb-5"}>
            <h3 className={"mb-4"}>Результат</h3>
            <div className={"w-100 h-75 p-4 bg-secondary-subtle border border-3 border-secondary"}>
              {result?.imt ? <p>Индекс массы тела: {result.imt}</p> : ""}
              {result?.category ? <p>Категория: {result.category}</p> : ""}
              {result?.risk ? <p>{result.risk}</p> : ""}
            </div>
          </div>
        </div>
      </div>
      <div className={"container"}>
        <div className={"mb-5"}>
          <h3>Индекс массы тела (ИМТ)</h3>
          <p>
            Индекс массы тела является показателем отношения веса и роста человека. Данный параметр помогает определить
            отклонения от нормальной массы тела в ту или иную сторону. Лишний вес опасен для человеческого здоровья,
            поскольку часто приводит к сердечным заболеваниям. Онлайн калькулятор индекса массы тела позволяет быстро и
            точно узнать, насколько ваш показатель веса соответствует норме. Чтобы рассчитать индекс массы тела
            необходимо выбрать в представленном сервисе свой рост и вес.
          </p>
          <p>
            Индекс массы тела для женщин считается нормальным, если показатель входит в диапазон от 20 до 22. Для мужчин
            этот показатель должен быть от 23 до 25. Статистика показывает, что люди, у которых данный показатель
            остается в пределах 18-22, живут в среднем дольше, чем те, у кого есть проблемы с весом.
          </p>
          <p>
            Если показатель ИМТ превышает 25, то это сигнал, что вам нужно менять свой образ жизни. Важно отметить, что
            используемая формула для расчета индекса массы тела может переоценить показатель ожирения для людей
            атлетического сложения, поскольку вычисления не учитывают мышечную массу.
          </p>
          <p>
            Индекс массы тела стал особенно актуален в западных странах, где проблема с ожирением встала достаточно
            остро. В самом начале расчет имт разрабатывался для социологических исследования, поэтому ставить
            медицинский диагноз с помощью этих расчетов не совсем правильно.
          </p>
          <p>
            Однако доступность и простота расчета сделала данный калькулятор очень популярным среди населения. Если
            индекс превышает число 30, то это с большой долей вероятности говорит об ожирении.
          </p>
          <p>
            Нужно понимать, что индекс массы тела не годится для постановления диагноза, но он может помочь в качестве
            контроля в процессе опробования новой фитнес-программы или диеты.
          </p>
          <p>Калькулятор ИМТ определит точку отсчета и позволит прослеживать изменения веса тела.</p>
        </div>
        <div className={"mb-5"}>
          <h3>Формула расчета индекса массы тела (ИМТ)</h3>
          <p>
            Для того, чтобы узнать свой ИМТ необходимо лишь свой вес в килограммах разделить на квадрат роста в метрах.
          </p>
          <p className={"text-center p-4 text-uppercase border border-3 border-warning rounded bg-white-yellow"}>
            ИМТ = вес/рост<sup>2</sup>
          </p>
          <p>
            Формула не учитывает пол и возраст человека, несмотря на то что ИМТ мужчин выше чем ИМТ женщин, а также ИМТ
            выше у людей среднего возраста, а у детей и пожилых людей этот показатель ниже.
          </p>
        </div>
        <div className={"mb-5"}>
          <h3>Сводная таблица значений</h3>
          <p>
            Интерпретация показателей ИМТ, в соответствии с ремомендациями Всемирной Организации Здравоохранения (ВОЗ)
          </p>
          <Table className={"d-inline-block table-bordered"}>
            <thead>
              <tr className={"table-secondary"}>
                <th>ИМТ</th>
                <th>Категория</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>16 и менее</td>
                <td>Выраженный дефицит массы тела</td>
              </tr>
              <tr>
                <td>16—18,5</td>
                <td>Недостаточная (дефицит) масса тела</td>
              </tr>
              <tr>
                <td>18,5—25</td>
                <td>Норма</td>
              </tr>
              <tr>
                <td>25—30</td>
                <td>Избыточная масса тела (предожирение)</td>
              </tr>
              <tr>
                <td>30—35</td>
                <td>Ожирение первой степени</td>
              </tr>
              <tr>
                <td>35—40</td>
                <td>Ожирение второй степени</td>
              </tr>
              <tr>
                <td>40 и более</td>
                <td>Ожирение третьей степени (морбидное)</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div>
          <h3>Статистика ИМТ</h3>
          <p>Статистика по процентному соотношению показателей индекса массы тела среди пользователей.</p>
          <WeightChart />
        </div>
      </div>
    </>
  );
};
