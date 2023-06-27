import { test, expect } from "vitest";
import { hexToRGBcss, rgbToHexcss, rgbToPercentcss, PercentTorgbcss } from "./ConvertCSS";

test("Convert HEX to RGB part 1", () => {
  expect(hexToRGBcss("342937")).toEqual("52, 41, 55");
});
test("Convert HEX to RGB part 2", () => {
  expect(hexToRGBcss("2d2c2f")).toEqual("45, 44, 47");
});
test("Convert HEX to RGB part 3 (Test input)", () => {
  expect(hexToRGBcss("2d2c2f13")).toEqual(NaN);
});

test("Convert RGB to HEX part 1", () => {
  expect(rgbToHexcss("42, 55, 39")).toEqual("2a3727");
});
test("Convert RGB to HEX part 2", () => {
  expect(rgbToHexcss("10, 255, 61")).toEqual("aff3d");
});
test("Convert RGB to HEX part 3 (Test input)", () => {
  expect(rgbToHexcss("0, 267, 0")).toEqual(NaN);
});
test("Convert RGB to Percent part 1 (Test input)", () => {
  expect(rgbToPercentcss("0, 255, -3")).toEqual(NaN);
});
test("Convert RGB to Percent part 2", () => {
  expect(rgbToPercentcss("10, 245, 38")).toEqual("4%, 96%, 15%");
});
test("Convert RGB Percent to RGB part 1 (Test input)", () => {
  expect(PercentTorgbcss("4, 255, 260")).toEqual(NaN);
});
test("Convert RGB Percent to RGB part 2", () => {
  expect(PercentTorgbcss("7%, 90%, 25%")).toEqual("18, 230, 64");
});
