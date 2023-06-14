import { test, expect } from "vitest";
import { imt } from "./imt";

test("underweight", () => {
  expect(imt(170, 34)).toEqual({
    category: "Выраженный дефицит массы тела.",
    imt: "11.76 кг / м2",
    risk: "Низкий риск сердечно-сосудистых заболеваний.",
  });
});

test("Insufficient (deficit) body weight", () => {
  expect(imt(170, 48)).toEqual({
    category: "Недостаточная (дефицит) масса тела.",
    imt: "16.61 кг / м2",
    risk: "Низкий риск сердечно-сосудистых заболеваний.",
  });
});

test("normal", () => {
  expect(imt(170, 54)).toEqual({
    category: "Норма.",
    imt: "18.69 кг / м2",
    risk: "Обычный риск сердечно-сосудистых заболеваний.",
  });
});
test("preobesity", () => {
  expect(imt(170, 76)).toEqual({
    category: "Избыточная масса тела (предожирение).",
    imt: "26.30 кг / м2",
    risk: "Повышенный риск сердечно-сосудистых заболеваний.",
  });
});

test("obesity of the first degree", () => {
  expect(imt(170, 90)).toEqual({
    category: "Ожирение первой степени.",
    imt: "31.14 кг / м2",
    risk: "Высокий риск сердечно-сосудистых заболеваний.",
  });
});

test("obesity of the second degree", () => {
  expect(imt(170, 102)).toEqual({
    category: "Ожирение второй степени.",
    imt: "35.29 кг / м2",
    risk: "Очень высокий риск сердечно-сосудистых заболеваний.",
  });
});

test("obesity of the third degree", () => {
  expect(imt(170, 133)).toEqual({
    category: "Ожирение третьей степени (морбидное).",
    imt: "46.02 кг / м2",
    risk: "Чрезвычайно высокий риск сердечно-сосудистых заболеваний.",
  });
});
