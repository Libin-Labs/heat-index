function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
export function rothfuszF(temperatureF: number, relativePercent: number): number {
  const t = finite(temperatureF, 80, 140),
    r = finite(relativePercent, 40, 100);
  return finite(
    -42.379 +
      2.04901523 * t +
      10.14333127 * r -
      0.22475541 * t * r -
      0.00683783 * t * t -
      0.05481717 * r * r +
      0.00122874 * t * t * r +
      0.00085282 * t * r * r -
      0.00000199 * t * t * r * r,
  );
}
export function rothfuszC(temperatureC: number, relativePercent: number): number {
  finite(temperatureC);
  return finite(((rothfuszF((temperatureC * 9) / 5 + 32, relativePercent) - 32) * 5) / 9);
}
