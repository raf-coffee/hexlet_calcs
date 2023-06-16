import { test, expect } from "vitest";
import { perfect } from "./perfect_weight.js";

test("perfect first test", () => {
  expect(perfect("female", 168, 80)).toEqual({
    bern: "56 кг по индексу Бернгарда,",
    nord: "71 кг по индексу Нордена,",
    tat: "65 кг по индексу Татоня.",
    dev: "60 кг по методу Devine",
    broc: "68 кг по формуле Брокка",
    loren: "59 кг по формуле Лоренца",
  });
});

test("perfect second test", () => {
  expect(perfect("female", 163, 70)).toEqual({
    bern: "48 кг по индексу Бернгарда,",
    nord: "69 кг по индексу Нордена,",
    tat: "60 кг по индексу Татоня.",
    dev: "56 кг по методу Devine",
    broc: "63 кг по формуле Брокка",
    loren: "57 кг по формуле Лоренца",
  });
});

test("perfect third test", () => {
  expect(perfect("male", 170, 74)).toEqual({
    bern: "53 кг по индексу Бернгарда,",
    nord: "72 кг по индексу Нордена,",
    tat: "67 кг по индексу Татоня.",
    dev: "67 кг по методу Devine",
    broc: "60 кг по формуле Брокка",
    loren: "60 кг по формуле Лоренца",
  });
});
