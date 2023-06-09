import { test, expect } from 'vitest';
import { ndfl, nds } from './ndfl';

test('NDFL 30%', () => {
    expect(ndfl(9450.43, 30)).toEqual('13500.61');
});
test('NDFL default', () => {
    expect(ndfl(9450.43)).toEqual('10862.56');
});