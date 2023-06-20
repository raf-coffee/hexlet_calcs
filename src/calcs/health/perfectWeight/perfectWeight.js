/*
Идеальный вес по индексам Бернгарда, Нордена, Татоня, по методу Devine, по формуле Брокка, Лоренца.

    heigth - значение поля "Рост, см"
    bust - значение поля "Обхват грудной клетки, см"
    sex - пол female, male
    функция возвращает объект со строками
*/

export const perfect = (sex, height, bust) => {
  const calc = {
    berngard: () => (height * bust) / 240,
    norden: () => (height * 420) / 1000,
    taton: () => height - (100 + (height - 100) / 20),
    devine: {
      female: () => 45.5 + 2.3 * (0.394 * height - 60),
      male: () => 50 + 2.3 * (0.394 * height - 60),
    },
    brocca: {
      female: () => height - 100,
      male: () => height - 110,
    },
    lorenca: () => height - 100 - (height - 150) / 2,
  };
  return {
    bern: `${Math.ceil(calc.berngard())} кг по индексу Борнгарда.`,
    nord: `${Math.ceil(calc.norden())} кг по индексу Ноордена.`,
    tat: `${Math.ceil(calc.taton())} кг по индексу Татоня.`,
    dev: `${Math.ceil(calc.devine[sex]())} кг по методу Devine.`,
    broc: `${Math.ceil(calc.brocca[sex]())} кг по формуле Брокка.`,
    loren: `${Math.ceil(calc.lorenca())} кг по формуле Лоренца.`,
  };
};
