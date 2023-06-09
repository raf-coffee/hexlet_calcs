import { Buffer } from 'node:buffer';
/*
  str - значение поля строки, с которой пользователь что-то будет делать.
  action - действие выбранной радиокнопки:
    b64ToUtf8 - раскодировать
    Utf8ToB64 - закодировать

    функция возвращает результат-строку
 */
export const base64 = (str, action) => {
  const actions = {
    b64ToUtf8: () => Buffer.from(str, 'base64').toString('utf8'),
    utf8ToB64: () => Buffer.from(str, 'utf8').toString('base64'),
  }
  return actions[action]();
};
