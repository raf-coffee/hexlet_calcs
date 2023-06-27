import { test, expect } from "vitest";
import { generatePass } from "./genPass.js";

test("password length", () => {
  const { password } = generatePass({
    passLength: 10,
    lowerCase: true,
    upperCase: false,
    numbers: false,
    symbols: false,
    excludeAmb: false,
    excludeBrackets: false,
    noRepeat: false,
  });
  expect(password.length).toEqual(10);
});

test("not enough symbols", () => {
  expect(
    generatePass({
      passLength: 11,
      lowerCase: false,
      upperCase: false,
      numbers: true,
      symbols: false,
      excludeAmb: false,
      excludeBrackets: false,
      noRepeat: true,
    })
  ).toEqual("Недостаточно символов для создания пароля такой длины без повторяющихся символов");
});

test("false checkboxes arguments", () => {
  expect(
    generatePass({
      passLength: 5,
      lowerCase: false,
      upperCase: false,
      numbers: false,
      symbols: false,
      excludeAmb: false,
      excludeBrackets: false,
      noRepeat: false,
    })
  ).toEqual("Пожалуйста, включите хотя бы один набор символов, из которых будет состоять пароль.");
});
