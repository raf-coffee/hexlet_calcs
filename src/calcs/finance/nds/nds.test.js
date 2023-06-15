import { test, expect } from "vitest";
import { nds } from "./nds";

test("accrue", () => {
  expect(nds({ nb: 40000, nst: 20, action: "accrue" })).toEqual("48000.00");
});
test("calc", () => {
  expect(nds({ nb: 48000, nst: 20, action: "calc" })).toEqual("40000.00");
});
test("accrue", () => {
  expect(nds({ nb: 40000, nst: 12, action: "accrue" })).toEqual("44800.00");
});
test("calc", () => {
  expect(nds({ nb: 44800, nst: 12, action: "calc" })).toEqual("40000.00");
});
