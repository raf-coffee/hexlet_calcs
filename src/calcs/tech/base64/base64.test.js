import { test, expect } from "vitest";
import { base64 } from "./base64";

test("decode base64 to Utf-16", () => {
  expect(base64("OCY5JjomOyY8Jj4mPyY=", "decode", "utf16")).toEqual("☸☹☺☻☼☾☿");
});

test("encode Utf-16 to Base64", () => {
  expect(base64("☸☹☺☻☼☾☿", "encode", "utf16")).toEqual("OCY5JjomOyY8Jj4mPyY=");
});

test("decode base64 to Utf-16", () => {
  expect(base64("SABlAGwAbABvACwAIAB3AG8AcgBsAGQA", "decode", "utf16")).toEqual("Hello, world");
});

test("encode Utf-16 to Base64", () => {
  expect(base64("Hello, world", "encode", "utf16")).toEqual("SABlAGwAbABvACwAIAB3AG8AcgBsAGQA");
});

test("decode base64 to Utf-16", () => {
  expect(base64("OgQ+BEgEOgQwBA==", "decode", "utf16")).toEqual("кошка");
});

test("encode Utf-16 to Base64", () => {
  expect(base64("кошка", "encode", "utf16")).toEqual("OgQ+BEgEOgQwBA==");
});
