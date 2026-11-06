import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('reference90F70percent', () => {
  assert.ok(Math.abs(api.rothfuszF(90, 70) - 105.9220206) < 1e-6);
});
test('reference100F40percent', () => {
  assert.ok(Math.abs(api.rothfuszF(100, 40) - 109.2555618) < 1e-9);
});
test('unit conversion', () => {
  assert.ok(Math.abs(api.rothfuszC(35, 60) - (api.rothfuszF(95, 60) - 32) / 1.8) < 1e-12);
});
test('regression domain rejection', () => {
  assert.throws(() => api.rothfuszF(79, 50));
  assert.throws(() => api.rothfuszF(90, 39));
  assert.throws(() => api.rothfuszC(20, 60));
});
test('numeric and upper bounds', () => {
  assert.throws(() => api.rothfuszF(Infinity, 50));
  assert.throws(() => api.rothfuszF(141, 50));
  assert.throws(() => api.rothfuszF(90, 101));
});
test('matrix-polynomial oracle', () => {
  const coeff = [
    [-42.379, 10.14333127, -0.05481717],
    [2.04901523, -0.22475541, 0.00085282],
    [-0.00683783, 0.00122874, -0.00000199],
  ];
  for (let t = 80; t <= 120; t += 10)
    for (let r = 40; r <= 100; r += 10) {
      let sum = 0;
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) sum += coeff[i][j] * t ** i * r ** j;
      assert.ok(Math.abs(api.rothfuszF(t, r) - sum) < 1e-10);
    }
});
