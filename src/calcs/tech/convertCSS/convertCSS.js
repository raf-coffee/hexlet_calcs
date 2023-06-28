export const getColorFormat = (color) => {
  if (color[0] === "#") {
    const values = color.slice(1);
    if (values.length === 6) {
      return { type: "hex", value: values.match(/.{1,2}/g) };
    }
    return { type: "hex", value: values.split("").map((item) => item.repeat(2)) };
  }

  const formatType = color.match(/^([^(])+/gi)[0];
  const formatValues = color.match(/\d+/gi);
  return { type: formatType, value: formatValues };
};

// функция конвертации из HEX в RGB
const hexToRGB = (hexCSS) => ({
  type: "RGB",
  result: `rgb(${parseInt(hexCSS.value[0], 16)}, ${parseInt(hexCSS.value[1], 16)}, ${parseInt(hexCSS.value[2], 16)})`,
});

// функция конвертации из HEX в HSL
const hexToHSL = (hexCSS) => {
  const rgb = hexToRGB(hexCSS).result.match(/\d+/gi);

  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;

  const minValue = Math.min(r, g, b);
  const maxValue = Math.max(r, g, b);
  const delta = maxValue - minValue;

  let h = 0;
  let s = 0;
  let l = 0;

  if (delta === 0) {
    h = 0;
  } else if (maxValue === r) {
    h = ((g - b) / delta) % 6;
  } else if (maxValue === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0) {
    h += 360;
  }

  l = (maxValue + minValue) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = Math.round(Number(s * 100));
  l = Math.round(Number(l * 100));

  return { type: "HSL", result: `hsl(${h}, ${parseFloat(s)}%, ${parseFloat(l)}%)` };
};

// функця конвертации из RGB в HEX
const rgbToHex = (rgbCSS) => {
  const arr = rgbCSS.value.map((item) => Number(item).toString(16));
  return {
    type: "HEX",
    result: `#${arr.map((item) => (item.length === 1 ? `0${item}` : item)).join("")}`,
  };
};

// функция конвертации из RGB в RGB с процентами
const rgbToPercent = (rgbCSS) => {
  const r = Math.round((Number(rgbCSS.value[0]) / 255) * 100);
  const g = Math.round((Number(rgbCSS.value[1]) / 255) * 100);
  const b = Math.round((Number(rgbCSS.value[2]) / 255) * 100);
  return { type: "RGB Percent", result: `rgb(${r}%, ${g}%, ${b}%)` };
};

// функция конвертации из RGB с процентами в RGB
// const percentToRGB = (rgbCSS) => {
//   const r = Math.round((Number(rgbCSS.value[0]) / 100) * 255);
//   const g = Math.round((Number(rgbCSS.value[1]) / 100) * 255);
//   const b = Math.round((Number(rgbCSS.value[2]) / 100) * 255);
//   return { type: "RGB", result: `rgb(${r}, ${g}, ${b})` };
// };

// функция конвертации из RGB с процентами в RGB
export const rgbToHSL = (rgbCSS) => {
  const r = rgbCSS.value[0] / 255;
  const g = rgbCSS.value[1] / 255;
  const b = rgbCSS.value[2] / 255;

  const minValue = Math.min(r, g, b);
  const maxValue = Math.max(r, g, b);
  const delta = maxValue - minValue;

  let h = 0;
  let s = 0;
  let l = 0;

  if (delta === 0) {
    h = 0;
  } else if (maxValue === r) {
    h = ((g - b) / delta) % 6;
  } else if (maxValue === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0) {
    h += 360;
  }

  l = (maxValue + minValue) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = Math.round(Number(s * 100));
  l = Math.round(Number(l * 100));

  return { type: "HSL", result: `hsl(${h}, ${parseFloat(s)}%, ${parseFloat(l)}%)` };
};

export const formatter = (data) => {
  const format = getColorFormat(data);
  const mapping = {
    hex: {
      toRGB: () => hexToRGB(format),
      toHSL: () => hexToHSL(format),
    },
    rgb: {
      toRGBPercent: () => rgbToPercent(format),
      toHEX: () => rgbToHex(format),
      toHSL: () => rgbToHSL(format),
    },
  };
  return Object.keys(mapping[format.type]).map((fn) => mapping[format.type][fn]());
};
