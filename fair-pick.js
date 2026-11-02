// fair-pick: small helpers for a browser spin wheel. No dependencies.

// Unbiased integer in [0, n), using rejection sampling on crypto random numbers.
export function randInt(n) {
  if (!Number.isInteger(n) || n < 1 || n > 2 ** 32) throw new RangeError('n must be 1 to 2^32');
  const limit = Math.floor(2 ** 32 / n) * n;
  const buf = new Uint32Array(1);
  do { crypto.getRandomValues(buf); } while (buf[0] >= limit);
  return buf[0] % n;
}

// Shuffle bag: every entry comes up once before any entry repeats.
// Returns a function that gives the next index. This is NOT independent draws.
export function shuffleBag(n) {
  let left = [];
  return function next() {
    if (!left.length) left = Array.from({ length: n }, (_, i) => i);
    return left.splice(randInt(left.length), 1)[0];
  };
}

// Rotation (radians) that puts the middle of slice `index` under a pointer at the top,
// for a wheel drawn clockwise from angle 0 on a canvas. Add whole turns for the animation.
export function landingAngle(index, n) {
  const slice = (Math.PI * 2) / n;
  return Math.PI * 1.5 - (index + 0.5) * slice;
}
