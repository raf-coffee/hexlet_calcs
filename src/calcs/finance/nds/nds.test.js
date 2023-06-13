import { test, expect } from "vitest";
import { nds } from "./nds";

test("accrue", () => {
  expect(nds(40000, 20, "accrue")).toEqual("48000.00");
});
test("calc", () => {
  expect(nds(48000, 20, "calc")).toEqual("40000.00");
});
test("accrue", () => {
  expect(nds(40000, 12, "accrue")).toEqual("44800.00");
});
test("calc", () => {
  expect(nds(44800, 12, "calc")).toEqual("40000.00");
});
