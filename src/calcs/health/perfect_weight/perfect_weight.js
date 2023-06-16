/*
Идеальный вес по индексам Бернгарда, Нордена, Татоня, по методу Devine, по формуле Брокка, Лоренца.

    heigth - значение поля "Рост, см"
    bust - значение поля "Обхват грудной клетки, см"
    sex - пол female, male
    функция возвращает объект со строками
*/

export const perfect = (sex, heigth, bust) => {
  const calc = {
    berngard: () => (heigth * bust) / 240,
    norden: () => (heigth * 420) / 1000,
    taton: () => heigth - (100 + (heigth - 100) / 20),
    devine: {
      female: () => 45.5 + 2.3 * (0.394 * heigth - 60),
      male: () => 50 + 2.3 * (0.394 * heigth - 60),
    },
    brocca: {
      female: () =>  heigth - 100,
      male: () =>  heigth - 110,
    },
    lorenca: () =>  (heigth - 100) - (heigth - 150) / 2,
  };
  return {
    bern: `${Math.ceil(calc['berngard']())} кг по индексу Бернгарда,`,
    nord: `${Math.ceil(calc['norden']())} кг по индексу Нордена,`,
    tat: `${Math.ceil(calc['taton']())} кг по индексу Татоня.`,
    dev: `${Math.ceil(calc.devine[sex]())} кг по методу Devine`,
    broc: `${Math.ceil(calc.brocca[sex]())} кг по формуле Брокка`,
    loren: `${Math.ceil(calc['lorenca']())} кг по формуле Лоренца`, 
  };
};
