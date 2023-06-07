import { test, expect } from 'vitest';
import imt from "./imt";

  test('underweight', () => {
    expect(imt(170, 34)).toEqual(` 11.76 кг/м2\n Выраженный дефицит массы тела.\n Низкий риск сердечно-сосудистых заболеваний.`);
  });
  test('Insufficient (deficit) body weight', () => {
    expect(imt(170, 48)).toEqual(` 16.61 кг/м2\n Недостаточная (дефицит) масса тела.\n Низкий риск сердечно-сосудистых заболеваний.`);
  });
  test('normal', () => {
    expect(imt(170, 54)).toEqual(` 18.69 кг/м2\n Норма.\n Обычный риск сердечно-сосудистых заболеваний.`);
  });
  test('preobesity', () => {
    expect(imt(170, 76)).toEqual(` 26.30 кг/м2\n Избыточная масса тела (предожирение).\n Повышенный риск сердечно-сосудистых заболеваний.`);
  });
  test('obesity of the first degree', () => {
    expect(imt(170, 90)).toEqual(` 31.14 кг/м2\n Ожирение первой степени.\n Высокий риск сердечно-сосудистых заболеваний.`);
  });
  test('obesity of the second degree', () => {
    expect(imt(170, 102)).toEqual(` 35.29 кг/м2\n Ожирение второй степени.\n Очень высокий риск сердечно-сосудистых заболеваний.`);
  });
  test('obesity of the third degree', () => {
    expect(imt(170, 133)).toEqual(` 46.02 кг/м2\n Ожирение третьей степени (морбидное).\n Чрезвычайно высокий риск сердечно-сосудистых заболеваний.`);
  });