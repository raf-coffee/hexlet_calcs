// функция преобразования из  формата HEX в RGb
function hexToRGBcss(hexCSS) {
  const hexCSStemp = String(hexCSS); // Преобразуем входные данные в строку
  if (hexCSStemp.length === 6) {
    const redCSSrgb = parseInt(hexCSStemp.slice(0, 2), 16); // Получаем значение красного цвета
    const greenCSSrgb = parseInt(hexCSStemp.slice(2, 4), 16); // Получаем значение зеленого цвета
    const blueCSSrgb = parseInt(hexCSStemp.slice(4, 6), 16); // Получаем значение синего цвета
    const result = `${redCSSrgb}, ${greenCSSrgb}, ${blueCSSrgb}`; // Возвращаем результат в видесроки
    return result;
  } // Проверяем, что строка из  6 символов

  return NaN;
}
// функця конвертации из формата RGB в шестнадцатиричный формат.
function rgbToHexcss(rgbCSS) {
  const rgbCSStemp = rgbCSS.replaceAll(" ", "").split(","); // убираем лишние пробелы в строке и преобразуем ее в массив.
  let resultHex = "";
  for (let i = 0; i < rgbCSStemp.length; i += 1) {
    if (rgbCSStemp[i] < 0 || rgbCSStemp[i] > 255) {
      return NaN; // Проверяем значения в массиве, если значение не между 0 и 255, то возвращаем NaN
    }
    const numTemp = Number(rgbCSStemp[i]).toString(16); // Конвертируем и добавляем в результат функции
    resultHex += numTemp;
  }

  return resultHex;
}
// функция преобразования из формата RGB в формат RGB с процентами
function rgbToPercentcss(rgbCSSinput) {
  const rgbCSS = rgbCSSinput.replaceAll(" ", "").split(","); // убираем лишние пробелы в строке и преобразуем ее в массив.
  const resultPercent = [];
  for (let i = 0; i < rgbCSS.length; i += 1) {
    if (rgbCSS[i] < 0 || rgbCSS[i] > 255) {
      return NaN; // Проверяем значения в массиве, если значение не между 0 и 255, то возвращаем NaN
    }
    const numTemp = Number((rgbCSS[i] * 100) / 255); // Конвертируем и добавляем в результат функции
    resultPercent.push(Math.round(numTemp));
  }
  return `${resultPercent[0]}%, ${resultPercent[1]}%, ${resultPercent[2]}%`;
}
// функция преобразования из формата RGB с процентами в формат RGB
function PercentTorgbcss(rgbCSSinput) {
  const rgbCSS = rgbCSSinput.replaceAll(" ", "").replaceAll("%", "").split(","); // убираем лишние пробелы и проценты в строке и преобразуем ее в массив.
  const resultPercent = [];
  for (let i = 0; i < rgbCSS.length; i += 1) {
    if (rgbCSS[i] < 0 || rgbCSS[i] > 255) {
      return NaN; // Проверяем значения в массиве, если значение не между 0 и 255, то возвращаем NaN
    }
    const numTemp = Number((rgbCSS[i] * 255) / 100); // Конвертируем и добавляем в результат функции
    resultPercent.push(Math.round(numTemp));
  }
  return `${resultPercent[0]}, ${resultPercent[1]}, ${resultPercent[2]}`;
}
export { hexToRGBcss, rgbToHexcss, rgbToPercentcss, PercentTorgbcss }; // Экспорируем функции  конвертации
