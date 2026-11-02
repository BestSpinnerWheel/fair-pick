import test from 'node:test';
import assert from 'node:assert/strict';
import { randInt, shuffleBag, landingAngle } from './fair-pick.js';

test('randInt stays in range and is roughly even', () => {
  const n = 7, runs = 700000, counts = Array(n).fill(0);
  for (let i = 0; i < runs; i++) counts[randInt(n)]++;
  for (const c of counts) assert.ok(Math.abs(c - runs / n) < runs / n * 0.02, String(counts));
});

test('randInt rejects bad input', () => {
  assert.throws(() => randInt(0), RangeError);
  assert.throws(() => randInt(1.5), RangeError);
});

test('shuffleBag gives each entry once per round', () => {
  const next = shuffleBag(6);
  for (let round = 0; round < 50; round++) {
    const seen = Array.from({ length: 6 }, next).sort();
    assert.deepEqual(seen, [0, 1, 2, 3, 4, 5]);
  }
});

test('landingAngle puts the chosen slice under the top pointer', () => {
  const n = 8, slice = (Math.PI * 2) / n;
  for (let i = 0; i < n; i++) {
    const middle = landingAngle(i, n) + (i + 0.5) * slice;
    assert.ok(Math.abs(middle - Math.PI * 1.5) < 1e-9);
  }
});
