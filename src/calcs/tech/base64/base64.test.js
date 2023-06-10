import { test, expect } from 'vitest';
import { base64 } from "./base64";

test('decode base64 to Utf-16', () => {
  expect(base64('OCY5JjomOyY8Jj4mPyY=', 'b64ToUtf16')).toEqual('☸☹☺☻☼☾☿');
});

test('encode Utf-16 to Base64', () => {
  expect(base64('☸☹☺☻☼☾☿', 'utf16ToB64')).toEqual('OCY5JjomOyY8Jj4mPyY=');
});

test('decode base64 to Utf-16', () => {
  expect(base64('SABlAGwAbABvACwAIAB3AG8AcgBsAGQA', 'b64ToUtf8')).toEqual('Hello, world');
});

test('encode Utf-16 to Base64', () => {
  expect(base64('Hello, world', 'utf16ToB64')).toEqual('SABlAGwAbABvACwAIAB3AG8AcgBsAGQA');
});

test('decode base64 to Utf-16', () => {
  expect(base64('OgQ+BEgEOgQwBA==', 'b64ToUtf16')).toEqual('кошка');
});

test('encode Utf-16 to Base64', () => {
  expect(base64('кошка', 'utf16ToB64')).toEqual('OgQ+BEgEOgQwBA==');
});
