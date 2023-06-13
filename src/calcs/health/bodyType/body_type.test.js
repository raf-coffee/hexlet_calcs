import { test, expect } from 'vitest';
import { bodyType } from "./body_type";

test('ectomorph female', () => {
  expect(bodyType(163, 46, 65, 14, 'female')).toEqual({
    pin: 'Очень слабое телосложение по формуле Пинье',
    rorera: 'Эктоморф по индексу Рорера',
    solovieva: 'Астеническое телосложение по индексу Соловьева Г. А.',
  });
});

test('ectomorph male', () => {
  expect(bodyType(170, 52, 70, 17, 'male')).toEqual({
    pin: 'Очень слабое телосложение по формуле Пинье',
    rorera: 'Эктоморф по индексу Рорера',
    solovieva: 'Астеническое телосложение по индексу Соловьева Г. А.',
  });
});

test('mesomorph female', () => {
  expect(bodyType(160, 60, 75, 17, 'female')).toEqual({
    pin: 'Среднее телосложение по формуле Пинье',
    rorera: 'Мезофорф по индексу Рорера',
    solovieva: 'Нормостеническое телосложение по индексу Соловьева Г. А.',
  });
});

test('mesomorph male', () => {
  expect(bodyType(170, 70, 75, 19, 'male')).toEqual({
    pin: 'Среднее телосложение по формуле Пинье',
    rorera: 'Мезофорф по индексу Рорера',
    solovieva: 'Нормостеническое телосложение по индексу Соловьева Г. А.',
  });
});
test('endomorph female', () => {
  expect(bodyType(160, 75, 76, 18, 'female')).toEqual({
    pin: 'Крепкое телосложение по формуле Пинье',
    rorera: 'Эндоморф по индексу Рорера',
    solovieva: 'Гиперстеническое телосложение по индексу Соловьева Г. А.',
  });
});

test('endomorph male', () => {
  expect(bodyType(170, 85, 88, 21, 'male')).toEqual({
    pin: 'Крепкое телосложение по формуле Пинье',
    rorera: 'Эндоморф по индексу Рорера',
    solovieva: 'Гиперстеническое телосложение по индексу Соловьева Г. А.',
  });
});
