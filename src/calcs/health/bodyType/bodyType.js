/* height - значение поля "Рост, см"
   weight - значение поля "Вес, кг"
   bust - значение поля "Обхват грудной клетки"
   carpus - значение поля "Обхват запястья"
   sex - значение поля "Пол" (female, male)
   функция возвращает объект со строками
*/
export const bodyType = ({ height, weight, bust, carpus, sex }) => {
  const pinie = height - (weight + bust);
  const rorer = (weight / (height / 100) ** 3).toFixed(1);
  const ruDesc = {
    1: "Эктоморф",
    2: "Мезофорф",
    3: "Эндоморф",
    4: "Очень слабое телосложение",
    5: "Слабое телосложение",
    6: "Среднее телосложение",
    7: "Нормальное телосложение",
    8: "Крепкое телосложение",
    9: "Астеническое телосложение",
    10: "Нормостеническое телосложение",
    11: "Гиперстеническое телосложение",
  };
  const ror = {
    1: () => (rorer <= 12.8 ? ruDesc[1] : false),
    2: () => (rorer >= 12.9 && rorer <= 14.6 ? ruDesc[2] : false),
    3: () => (rorer > 14.7 ? ruDesc[3] : false),
  };

  const pin = {
    1: () => (pinie > 36 ? ruDesc[4] : false),
    2: () => (pinie >= 26 && pinie <= 35 ? ruDesc[5] : false),
    3: () => (pinie >= 21 && pinie <= 25 ? ruDesc[6] : false),
    4: () => (pinie >= 10 && pinie <= 20 ? ruDesc[7] : false),
    5: () => (pinie < 10 ? ruDesc[8] : false),
  };

  const soloviev = {
    female: {
      1: () => (carpus < 15 ? ruDesc[9] : false),
      2: () => (carpus >= 15 && carpus <= 17 ? ruDesc[10] : false),
      3: () => (carpus > 17 ? ruDesc[11] : false),
    },
    male: {
      1: () => (carpus < 18 ? ruDesc[9] : false),
      2: () => (carpus >= 18 && carpus <= 20 ? ruDesc[10] : false),
      3: () => (carpus > 20 ? ruDesc[11] : false),
    },
  };
  const resPinie = Object.entries(pin)
    .filter((func) => func[1]() !== false)
    .flat()[1]();
  const resRor = Object.entries(ror)
    .filter((func) => func[1](rorer) !== false)
    .flat()[1](rorer);
  const resSol = Object.entries(
    Object.entries(soloviev)
      .filter((row) => row.includes(sex))
      .flat()[1]
  )
    .filter((row) => row[1]())
    .flat()[1]();
  return {
    pin: `${resPinie} по формуле Пинье`,
    rorera: `${resRor} по индексу Рорера`,
    solovieva: `${resSol} по индексу Соловьева Г. А.`,
  };
};
