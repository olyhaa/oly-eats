const { closestFraction, formatFraction } = require('../fractionParser');

describe('closestFraction', () => {
  it('exact match', () => {
    expect(closestFraction(0)).toEqual('');
    expect(closestFraction(0.125)).toEqual('1/8');
    expect(closestFraction(0.25)).toEqual('1/4');
    expect(closestFraction(0.333)).toEqual('1/3');
    expect(closestFraction(0.5)).toEqual('1/2');
    expect(closestFraction(0.666)).toEqual('2/3');
    expect(closestFraction(0.75)).toEqual('3/4');
    expect(closestFraction(1)).toEqual('1');
  });

  it('close match', () => {
    expect(closestFraction(0.01)).toEqual('');
    expect(closestFraction(0.1)).toEqual('1/8');
    expect(closestFraction(0.15)).toEqual('1/8');
    expect(closestFraction(0.2)).toEqual('1/4');
    expect(closestFraction(0.27)).toEqual('1/4');
    expect(closestFraction(0.3)).toEqual('1/3');
    expect(closestFraction(0.33)).toEqual('1/3');
    expect(closestFraction(0.339)).toEqual('1/3');
    expect(closestFraction(0.45)).toEqual('1/2');
    expect(closestFraction(0.55)).toEqual('1/2');
    expect(closestFraction(0.6)).toEqual('2/3');
    expect(closestFraction(0.66)).toEqual('2/3');
    expect(closestFraction(0.669)).toEqual('2/3');
    expect(closestFraction(0.73)).toEqual('3/4');
    expect(closestFraction(0.8)).toEqual('3/4');
    expect(closestFraction(0.9)).toEqual('1');
  });
});

describe('formatFraction', () => {
  it('exact values', () => {
    expect(formatFraction(1 / 8)).toBe('1/8');
    expect(formatFraction(2 / 8)).toBe('1/4');
    expect(formatFraction(4 / 8)).toBe('1/2');
    expect(formatFraction(6 / 8)).toBe('3/4');
    expect(formatFraction(8 / 8)).toBe('1');
    expect(formatFraction(0.33)).toBe('1/3');
    expect(formatFraction(2 / 6)).toBe('1/3');
    expect(formatFraction(0.66)).toBe('2/3');
    expect(formatFraction(4 / 6)).toBe('2/3');
  });

  it('odd decimals', () => {
    expect(formatFraction(0.111)).toBe('1/8');
    expect(formatFraction(0.22)).toBe('1/4');
    expect(formatFraction(0.35)).toBe('1/3');
    expect(formatFraction(0.48)).toBe('1/2');
    expect(formatFraction(0.76)).toBe('3/4');
    expect(formatFraction(0.98)).toBe('1');
  });

  it('mixed numbers', () => {
    expect(formatFraction(1.5)).toBe('1 1/2');
    expect(formatFraction(3.75)).toBe('3 3/4');
    expect(formatFraction(1.33)).toBe('1 1/3');
    expect(formatFraction(2.67)).toBe('2 2/3');
    expect(formatFraction(4.26)).toBe('4 1/4');
    expect(formatFraction(1.12)).toBe('1 1/8');
    expect(formatFraction(1.01)).toBe('1');
  });
});
