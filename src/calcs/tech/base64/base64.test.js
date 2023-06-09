import { test, expect } from 'vitest';
import { base64 } from "./base64";

test('decode base64 to Utf-8', () => {
  expect(base64('Zm9yIHRlc3Rz', 'b64ToUtf8')).toEqual('for tests');
});
test('encode Utf-8 to Base64', () => {
 expect(base64('for tests', 'utf8ToB64')).toEqual('Zm9yIHRlc3Rz');
});
