import { test, expect } from 'vitest';
import { ndflAfter, ndflBefore, } from './ndfl';

test('NDFL 30% after', () => {
    expect(ndflAfter(9450.43, 30)).toEqual({sum:'13500.61', ndfl:'4050.18'});
});
test('NDFL default after', () => {
    expect(ndflAfter(9450.43)).toEqual({sum:'10862.56', ndfl:'1412.13'});
});
test('NDFL default before', () => {
    expect(ndflBefore(24892.40)).toEqual({sum:'21656.39', ndfl:'3236.01'});
});
test('NDFL 15% before', () => {
    expect(ndflBefore(21656.40, 15)).toEqual({sum:'18407.94', ndfl:'3248.46'});
});
test('NDFL OVER 5000000 before', () => {
    expect(ndflBefore(5000100)).toEqual({sum:'4350085.00', ndflSum:'650015.00',  ndfl:'650000.00', beforePaidOver:'100.00' , ndflover:'15.00'});
});
//test('NDFL OVER 5000000 after', () => {
//    expect(ndflAfter(4700000)).toEqual({sum:'5411764.71', ndflSum:'711764.71',  ndfl:'650000.00', afterPaidOver:'411764.71' , ndflover:'61764.71'});
//});