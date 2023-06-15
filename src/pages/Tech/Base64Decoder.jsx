import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FloatingLabel } from "react-bootstrap";
import { CountButton } from "../../components/CountButton/CountButton.jsx";
import { Loader } from "../../components/Loader/Loader.jsx";
import { base64 } from "../../calcs/tech/base64/base64.js";

const formSchema = z.object({
  text: z.coerce.string().trim().min(1, { message: "Строка должна содержать как минимум один символ" }),
  action: z.coerce.string(),
});

export function Base64Decoder() {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });

  const handleFormSubmit = (data) => {
    const { text, action } = data;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResult(base64(text, action));
    }, 2000);
  };

  return (
    <div>
      <div className="container text-start">
        <div className="row mb-4">
          <div className="col-sm mb-5">
            <h3 className="mb-5">Кодирование в base64</h3>
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
              <Form.Group className="mb-4 row" controlId="text">
                <div className="col">
                  <FloatingLabel controlId="textarea" label="Введите текст" className="mb-3">
                    <Form.Control
                      as="textarea"
                      placeholder="Введите текст"
                      style={{ height: "100px" }}
                      {...register("text")}
                    />
                  </FloatingLabel>
                </div>
                {errors?.text?.message && <p className="text-danger">{errors.text.message}</p>}
              </Form.Group>
              <Form.Group className="mb-4 row" controlId="variants">
                <div className="col-4 text-nowrap">
                  <Form.Label>Вариант расчета</Form.Label>
                </div>
                <div className="col-8">
                  <Form.Select aria-label="Вариант расчета" {...register("action")}>
                    <option value="utf16ToB64">Кодировать</option>
                    <option value="b64ToUtf16">Декодировать</option>
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
        <h3>Описание калькулятора</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus leo nulla, lobortis at sollicitudin at,
          cursus nec tortor. Vestibulum dolor eros, tempor sed enim at, tincidunt condimentum purus. Ut ut orci viverra,
          varius felis at, fringilla justo. In placerat blandit ipsum nec tempor. Suspendisse vestibulum eleifend
          ligula, non commodo risus maximus et. Integer laoreet, ipsum a ullamcorper varius, metus dui auctor ligula, id
          eleifend est turpis in metus. Donec et risus et elit suscipit convallis ac ac nunc. Vivamus mollis massa eu mi
          condimentum mattis.
        </p>
      </div>
    </div>
  );
}
