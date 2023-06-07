import { test, expect } from 'vitest';
import generatePass from "./genPass.js";

test('password length', () => {
    expect(generatePass(10, true, false, false, false, false, false, false).length).toEqual(10);
});

test('without checkboxes arguments', () => {
    expect(generatePass(10)).toEqual("");
});

test('not enough symbols', () => {
    expect(generatePass(11, false, false, true, false, false, false, true)).toEqual('Недостаточно символов для создания пароля такой длины без повторяющихся символов');
});

test('false checkboxes arguments', () => {
    expect(generatePass(5, false, false, false, false, false, false, false)).toEqual('Пожалуйста, включите хотя бы один набор символов, из которых будет состоять пароль.');
});