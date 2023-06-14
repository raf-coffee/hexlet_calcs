import { test, expect } from "vitest";
import { bodyType } from "./bodyType";

test("ectomorph female", () => {
  const data = { height: 163, weight: 46, bust: 65, carpus: 14, sex: "female" };
  expect(bodyType(data)).toEqual({
    pin: "Очень слабое телосложение по формуле Пинье",
    rorera: "Эктоморф по индексу Рорера",
    solovieva: "Астеническое телосложение по индексу Соловьева Г. А.",
  });
});

test("ectomorph male", () => {
  const data = { height: 170, weight: 52, bust: 70, carpus: 17, sex: "male" };
  expect(bodyType(data)).toEqual({
    pin: "Очень слабое телосложение по формуле Пинье",
    rorera: "Эктоморф по индексу Рорера",
    solovieva: "Астеническое телосложение по индексу Соловьева Г. А.",
  });
});

test("mesomorph female", () => {
  const data = { height: 160, weight: 60, bust: 75, carpus: 17, sex: "female" };
  expect(bodyType(data)).toEqual({
    pin: "Среднее телосложение по формуле Пинье",
    rorera: "Мезофорф по индексу Рорера",
    solovieva: "Нормостеническое телосложение по индексу Соловьева Г. А.",
  });
});

test("mesomorph male", () => {
  const data = { height: 170, weight: 70, bust: 75, carpus: 19, sex: "male" };
  expect(bodyType(data)).toEqual({
    pin: "Среднее телосложение по формуле Пинье",
    rorera: "Мезофорф по индексу Рорера",
    solovieva: "Нормостеническое телосложение по индексу Соловьева Г. А.",
  });
});
test("endomorph female", () => {
  const data = { height: 160, weight: 75, bust: 76, carpus: 18, sex: "female" };
  expect(bodyType(data)).toEqual({
    pin: "Крепкое телосложение по формуле Пинье",
    rorera: "Эндоморф по индексу Рорера",
    solovieva: "Гиперстеническое телосложение по индексу Соловьева Г. А.",
  });
});

test("endomorph male", () => {
  const data = { height: 170, weight: 85, bust: 88, carpus: 21, sex: "male" };
  expect(bodyType(data)).toEqual({
    pin: "Крепкое телосложение по формуле Пинье",
    rorera: "Эндоморф по индексу Рорера",
    solovieva: "Гиперстеническое телосложение по индексу Соловьева Г. А.",
  });
});
