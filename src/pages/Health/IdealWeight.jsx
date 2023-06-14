import { useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CountButton } from "../../components/CountButton/CountButton.jsx";
import { Loader } from "../../components/Loader/Loader.jsx";

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
  chest: z.coerce
    .number({
      invalid_type_error: "Обхват груди должен быть числом",
    })
    .positive({ message: "Обхват груди должен быть больше 0" }),
  wrist: z.coerce
    .number({
      invalid_type_error: "Обхват запястья должен быть числом",
    })
    .positive({ message: "Обхват запястья должен быть больше 0" }),
  sex: z.coerce.string(),
});

export function IdealWeight() {
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
    <div>
      <div className="container text-start">
        <div className="row mb-4">
          <div className="col-sm mb-5">
            <h3 className="mb-5">Калькулятор идеального веса</h3>
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
              <Form.Group className="mb-4 row" controlId="height">
                <div className="col-4 text-nowrap">
                  <Form.Label>Рост (см)</Form.Label>
                </div>
                <div className="col-8">
                  <Form.Control type="text" {...register("height")} />
                </div>
                {errors?.height?.message && <p className="text-danger">{errors.height.message}</p>}
              </Form.Group>
              <Form.Group className="mb-4 row" controlId="weight">
                <div className="col-4 text-nowrap">
                  <Form.Label>Вес (кг)</Form.Label>
                </div>
                <div className="col-8">
                  <Form.Control type="text" name="weight" {...register("weight")} />
                </div>
                {errors?.weight?.message && <p className="text-danger">{errors.weight.message}</p>}
              </Form.Group>
              <Form.Group className="mb-4 row" controlId="chest">
                <div className="col-4 text-nowrap">
                  <Form.Label className="col-4">Обхват груди (см)</Form.Label>
                </div>
                <div className="col-8">
                  <Form.Control type="text" {...register("chest")} />
                </div>
                {errors?.chest?.message && <p className="text-danger">{errors.chest.message}</p>}
              </Form.Group>
              <Form.Group className="mb-4 row" controlId="wrist">
                <div className="col-4 text-nowrap">
                  <Form.Label>Обхват запястья (см)</Form.Label>
                </div>
                <div className="col-8">
                  <Form.Control type="text" {...register("wrist")} />
                </div>
                {errors?.wrist?.message && <p className="text-danger">{errors.wrist.message}</p>}
              </Form.Group>
              <Form.Group className="mb-4 row" controlId="sex">
                <div className="col-4 text-nowrap">
                  <Form.Label className="col-4">Пол</Form.Label>
                </div>
                <div className="col-8" {...register("sex")}>
                  <Form.Select aria-label="Пол">
                    <option value="man">Мужской</option>
                    <option value="woman">Женский</option>
                  </Form.Select>
                </div>
              </Form.Group>
              <CountButton disabled={Object.entries(errors).length > 0} color="bg-deep-green" />
            </Form>
          </div>
          <div className="col-sm mb-5">
            <h3 className="mb-4">Результат</h3>
            <div className="w-100 h-75 p-4 bg-secondary-subtle border border-3 border-secondary">
              {!isLoading && result}
              {isLoading && <Loader />}
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>
          Калькулятор веса поможет вам определить идеальный вес исходя из вашего реального роста. Благодаря полученным
          данным вы сможете узнать стоит ли вам сбросить лишние килограммы или же наоборот набрать полезную массу тела.
        </p>
        <div className="mb-5 text-start">
          <h3>Масса тела по Броку</h3>
          <p>
            Французский антрополог Поль Брока предложил формулу для определения веса в 19 веке. Она считается более
            точной, поскольку для расчетов в ней принимаются во внимание три ключевых параметра человеческого тела:
            рост, возраст и тип телосложения (имеется ввиду ширина кости - тонкокостный, ширококостный или нормальный).
          </p>
          <p>
            Конечно же, полученные данные являются среднестатистическими, поскольку каждый организм человека уникальный,
            у каждого он функционирует совершенно по разному. Кроме того система не принимает во внимание питание и
            образ жизни человека. Однако, калькулятор веса позволит вам узнать приблизительный показатель идеального
            веса с той целью, чтобы вы в своей жизни смогли, по возможности, держаться как можно ближе своего полезного
            веса.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
