import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "react-bootstrap";
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
      try {
        setResult(base64(text, action));
      } catch {
        setResult("Строка содержит не поддерживаемые символы");
      }
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
                <div className="col-3 text-nowrap">
                  <Form.Label controlId="textarea" label="Введите текст">
                    Введите текст:
                  </Form.Label>
                </div>
                <div className="col-9">
                  <Form.Control as="textarea" style={{ height: "100px" }} {...register("text")} />
                  {errors?.text?.message && <p className="text-danger">{errors.text.message}</p>}
                </div>
              </Form.Group>
              <Form.Group className="mb-4 row" controlId="variants">
                <div className="col-3 text-nowrap">
                  <Form.Label>Вариант расчета</Form.Label>
                </div>
                <div className="col-9">
                  <Form.Select aria-label="Вариант расчета" {...register("action")}>
                    <option value="utf16ToB64">Кодировать</option>
                    <option value="b64ToUtf16">Декодировать</option>
                  </Form.Select>
                </div>
              </Form.Group>
              <CountButton disabled={Object.entries(errors).length > 0 || isLoading} color="bg-deep-green" />
            </Form>
          </div>
          <div className="col-sm mb-5">
            <h3 className="mb-4">Результат</h3>
            <div className="w-100 h-75 p-4 bg-secondary-subtle border border-3 border-secondary text-break overflow-y-auto">
              {!isLoading && result}
              {isLoading && <Loader />}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <h3>Что такое base64?</h3>
        <p>
          Base64 — стандарт кодирования двоичных данных при помощи только 64 символов ASCII. Алфавит кодирования
          содержит латинские символы A-Z, a-z, цифры 0-9 (всего 62 знака) и 2 дополнительных символа, зависящих от
          системы реализации. Впервые этот стандарт кодирования был описан в 1987 в RFC 989, а свое название получил в
          1992.
        </p>
        <p>
          Идея base64 проста — обратимое кодирование, с возможностью восстановления, которое переводит все символы
          восьмибитной кодовой таблицы в символы, гарантированно сохраняющиеся при передаче данных в любых сетях и между
          любыми устройствами. Эта система широко используется в электронной почте для представления бинарных файлов в
          тексте письма.
        </p>
      </div>
      <div className="mb-5">
        <h3>Применение в веб-приложениях</h3>
        <p>
          Благодаря Base64 в html-документы можно включать бинарный контент, создавая единый документ без отдельно
          расположенных картинок и прочих дополнительных файлов. Таким образом html-документ с включённой в него
          графикой, аудио, видео, программами, стилями и прочими дополнениями становится прекрасной альтернативой другим
          форматам сложнооформленных документов типа doc, docx, pdf. Некоторые приложения кодируют двоичные данные для
          удобства включения в URL, скрытые поля форм.
        </p>
      </div>
      <div className="mb-5">
        <h3>Другие применения</h3>
        <p>Существует множество вариантов применения Base64. Например:</p>
        <ul>
          <li>Thunderbird и Mozilla Suite использовали Base64 для сокрытия паролей в POP3.</li>
          <li>
            Base64 может использоваться как метод для сокрытия секретов без издержек на криптографическое управление
            ключами, однако этот подход является абсолютно небезопасным и не рекомендуется к использованию.
          </li>
          <li>
            Сканеры спама, которые не декодируют сообщения в Base64, часто пропускают их, так как такие сообщения
            кажутся достаточно случайными, чтобы быть принятыми за спам. Это используют спамеры для обхода основных
            антиспамовых инструментов.
          </li>
          <li>
            Данный стандарт применяется для кодирования изображений формата JPEG и PNG, для вставки их в электронные
            книги формата FB2.
          </li>
          <li>
            Существуют приложения, использующие кодировку Base64 для отправки небольших изображений посредством длинных
            SMS.
          </li>
        </ul>
      </div>
    </div>
  );
}
