import {
  isNumeric,
  isFraction,
  isNumber,
  properCase,
  isUnitOfMeasure,
  unitNormalizer,
  getRangedAmount,
  getNumber,
  getAmount,
} from '../ingredientComponentsHelper';

describe('isNumeric', () => {
  it('numeric number', () => {
    expect(isNumeric(1)).toBeTruthy();
    expect(isNumeric(0)).toBeTruthy();
    expect(isNumeric(10)).toBeTruthy();
  });

  it('numeric string', () => {
    expect(isNumeric('1')).toBeTruthy();
    expect(isNumeric('0')).toBeTruthy();
    expect(isNumeric('10')).toBeTruthy();
  });

  it('decimal number', () => {
    expect(isNumeric(1.5)).toBeTruthy();
    expect(isNumeric(0.75)).toBeTruthy();
    expect(isNumeric(0.25)).toBeTruthy();
    expect(isNumeric(1.0)).toBeTruthy();
  });

  it('decimal string', () => {
    expect(isNumeric('1.5')).toBeTruthy();
    expect(isNumeric('0.75')).toBeTruthy();
    expect(isNumeric('0.25')).toBeTruthy();
    expect(isNumeric('1.0')).toBeTruthy();
  });

  it('fractional string', () => {
    expect(isNumeric('1/2')).toBeFalsy();
    expect(isNumeric('3/4')).toBeFalsy();
    expect(isNumeric('1 1/2')).toBeFalsy();
  });

  it('string with numbers', () => {
    expect(isNumeric('abc1/2')).toBeFalsy();
    expect(isNumeric('4pop')).toBeFalsy();
    expect(isNumeric('see4me')).toBeFalsy();
  });

  it('string', () => {
    expect(isNumeric('abc')).toBeFalsy();
  });

  it('empty', () => {
    expect(isNumeric('')).toBeFalsy();
    expect(isNumeric()).toBeFalsy();
    expect(isNumeric(undefined)).toBeFalsy();
    expect(isNumeric(null)).toBeFalsy();
  });
});

describe('isFraction', () => {
  it('numeric number', () => {
    expect(isFraction(1)).toBeFalsy();
    expect(isFraction(0)).toBeFalsy();
    expect(isFraction(10)).toBeFalsy();
  });

  it('numeric string', () => {
    expect(isFraction('1')).toBeFalsy();
    expect(isFraction('0')).toBeFalsy();
    expect(isFraction('10')).toBeFalsy();
  });

  it('decimal number', () => {
    expect(isFraction(1.5)).toBeFalsy();
    expect(isFraction(0.75)).toBeFalsy();
    expect(isFraction(0.25)).toBeFalsy();
    expect(isFraction(1.0)).toBeFalsy();
  });

  it('decimal string', () => {
    expect(isFraction('1.5')).toBeFalsy();
    expect(isFraction('0.75')).toBeFalsy();
    expect(isFraction('0.25')).toBeFalsy();
    expect(isFraction('1.0')).toBeFalsy();
  });

  it('fractional string', () => {
    expect(isFraction('1/2')).toBeTruthy();
    expect(isFraction('3/4')).toBeTruthy();
    expect(isFraction('1 1/2')).toBeTruthy();
  });

  it('string with numbers', () => {
    expect(isFraction('abc1/2')).toBeFalsy();
    expect(isFraction('4pop')).toBeFalsy();
    expect(isFraction('see4me')).toBeFalsy();
  });

  it('string', () => {
    expect(isFraction('abc')).toBeFalsy();
  });

  it('empty', () => {
    expect(isFraction('')).toBeFalsy();
    expect(isFraction()).toBeFalsy();
    expect(isFraction(undefined)).toBeFalsy();
    expect(isFraction(null)).toBeFalsy();
  });
});

describe('isNumber', () => {
  it('numeric number', () => {
    expect(isNumber(1)).toBeTruthy();
    expect(isNumber(0)).toBeTruthy();
    expect(isNumber(10)).toBeTruthy();
  });

  it('numeric string', () => {
    expect(isNumber('1')).toBeTruthy();
    expect(isNumber('0')).toBeTruthy();
    expect(isNumber('10')).toBeTruthy();
  });

  it('decimal number', () => {
    expect(isNumber(1.5)).toBeTruthy();
    expect(isNumber(0.75)).toBeTruthy();
    expect(isNumber(0.25)).toBeTruthy();
    expect(isNumber(1.0)).toBeTruthy();
  });

  it('decimal string', () => {
    expect(isNumber('1.5')).toBeTruthy();
    expect(isNumber('0.75')).toBeTruthy();
    expect(isNumber('0.25')).toBeTruthy();
    expect(isNumber('1.0')).toBeTruthy();
  });

  it('fractional string', () => {
    expect(isNumber('1/2')).toBeTruthy();
    expect(isNumber('3/4')).toBeTruthy();
    expect(isNumber('1 1/2')).toBeTruthy();
  });

  it('string with numbers', () => {
    expect(isNumber('abc1/2')).toBeFalsy();
    expect(isNumber('4pop')).toBeFalsy();
    expect(isNumber('see4me')).toBeFalsy();
  });

  it('string', () => {
    expect(isNumber('abc')).toBeFalsy();
  });

  it('empty', () => {
    expect(isNumber('')).toBeFalsy();
    expect(isNumber()).toBeFalsy();
    expect(isNumber(undefined)).toBeFalsy();
    expect(isNumber(null)).toBeFalsy();
  });
});

describe('properCase', () => {
  it('single word', () => {
    expect(properCase('HELLO')).toBe('Hello');
    expect(properCase('hello')).toBe('Hello');
    expect(properCase('HeLlO')).toBe('Hello');
  });

  it('multiple words', () => {
    expect(properCase('HELLO, WORLD')).toBe('Hello, World');
    expect(properCase('hello, world')).toBe('Hello, World');
    expect(properCase('hello, WORLD')).toBe('Hello, World');
    expect(properCase('HelLo, worlD')).toBe('Hello, World');
    expect(properCase('Hello, World')).toBe('Hello, World');
  });

  it('non-string', () => {
    expect(properCase('')).toBe('');
    expect(properCase(undefined)).toBeUndefined();
    expect(properCase(null)).toBe(null);
    expect(properCase(1)).toBe(1);
  });
});

describe.skip('checkForMatch', () => {
  it('needs to be implemented', () => {
    expect(true).toBeTruthy();
  });
});

describe('isUnitOfMeasure', () => {
  it('singulars', () => {
    expect(isUnitOfMeasure('tablespoon')).toBeTruthy();
    expect(isUnitOfMeasure('T')).toBeTruthy();
    expect(isUnitOfMeasure('Tbs')).toBeTruthy();
    expect(isUnitOfMeasure('tbs')).toBeTruthy();
    expect(isUnitOfMeasure('Tbsp')).toBeTruthy();
    expect(isUnitOfMeasure('tbsp')).toBeTruthy();
    expect(isUnitOfMeasure('teaspoon')).toBeTruthy();
    expect(isUnitOfMeasure('can')).toBeTruthy();
    expect(isUnitOfMeasure('"')).toBeTruthy();
    expect(isUnitOfMeasure('quart')).toBeTruthy();
    expect(isUnitOfMeasure('ounce')).toBeTruthy();
    expect(isUnitOfMeasure('c')).toBeTruthy();
    expect(isUnitOfMeasure('Cup')).toBeTruthy();
    expect(isUnitOfMeasure('cup')).toBeTruthy();
  });

  it('plurals', () => {
    expect(isUnitOfMeasure('tablespoons')).toBeTruthy();
    expect(isUnitOfMeasure('teaspoons')).toBeTruthy();
    expect(isUnitOfMeasure('ounces')).toBeTruthy();
    expect(isUnitOfMeasure('Cups')).toBeTruthy();
    expect(isUnitOfMeasure('cups')).toBeTruthy();
    expect(isUnitOfMeasure('pounds')).toBeTruthy();
    expect(isUnitOfMeasure('Lbs')).toBeTruthy();
    expect(isUnitOfMeasure('lbs')).toBeTruthy();
    expect(isUnitOfMeasure('pinches')).toBeTruthy();
  });

  it('non-units', () => {
    expect(isUnitOfMeasure('')).toBeFalsy();
    expect(isUnitOfMeasure('apple')).toBeFalsy();
    expect(isUnitOfMeasure(null)).toBeFalsy();
    expect(isUnitOfMeasure(undefined)).toBeFalsy();
  });
});

describe('unitNormalizer', () => {
  it('already normalized', () => {
    expect(unitNormalizer('Tablespoon')).toBe('Tablespoon');
    expect(unitNormalizer('Cup')).toBe('Cup');
    expect(unitNormalizer('Can')).toBe('Can');
    expect(unitNormalizer('Pound')).toBe('Pound');
    expect(unitNormalizer('Ounce')).toBe('Ounce');
  });

  it('top-level unit', () => {
    expect(unitNormalizer('tablespoon')).toBe('Tablespoon');
    expect(unitNormalizer('teaspoon')).toBe('Teaspoon');
    expect(unitNormalizer('quart')).toBe('Quart');
    expect(unitNormalizer('ounce')).toBe('Ounce');
    expect(unitNormalizer('whole')).toBe('Whole');
    expect(unitNormalizer('bottle')).toBe('Bottle');
    expect(unitNormalizer('pound')).toBe('Pound');
  });

  it('expanded unit', () => {
    expect(unitNormalizer('T')).toBe('Tablespoon');
    expect(unitNormalizer('Tbs')).toBe('Tablespoon');
    expect(unitNormalizer('tbs')).toBe('Tablespoon');
    expect(unitNormalizer('t')).toBe('Teaspoon');
    expect(unitNormalizer('tsp')).toBe('Teaspoon');
    expect(unitNormalizer('c')).toBe('Cup');
    expect(unitNormalizer('oz')).toBe('Ounce');
    expect(unitNormalizer('"')).toBe('Inch');
    expect(unitNormalizer('pkg')).toBe('Package');
  });

  it('plural top-level unit', () => {
    expect(unitNormalizer('tablespoons')).toBe('Tablespoon');
    expect(unitNormalizer('teaspoons')).toBe('Teaspoon');
    expect(unitNormalizer('quarts')).toBe('Quart');
    expect(unitNormalizer('ounces')).toBe('Ounce');
    expect(unitNormalizer('bottles')).toBe('Bottle');
    expect(unitNormalizer('pounds')).toBe('Pound');
  });

  it('plural expanded unit', () => {
    expect(unitNormalizer('Tbsps')).toBe('Tablespoon');
    expect(unitNormalizer('tsps')).toBe('Teaspoon');
    expect(unitNormalizer('pkgs')).toBe('Package');
  });
});

describe('getNumber', () => {
  it('no numbers', () => {
    expect(getRangedAmount('c salt')).toBeUndefined();
    expect(getRangedAmount('c salt #2')).toBeUndefined();
  });

  it('single numbers', () => {
    expect(getNumber('1 c salt')).toEqual({
      match: '1',
      rest: ['c', 'salt'],
    });
    expect(getNumber('1 c salt, optional')).toEqual({
      match: '1',
      rest: ['c', 'salt,', 'optional'],
    });
    expect(getNumber('1 c salt, to taste')).toEqual({
      match: '1',
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getNumber('1/2 c flour, divided')).toEqual({
      match: '1/2',
      rest: ['c', 'flour,', 'divided'],
    });
    expect(getNumber('1.5 c flour, divided')).toEqual({
      match: '1.5',
      rest: ['c', 'flour,', 'divided'],
    });
    expect(getNumber('1c flour, divided')).toEqual({
      match: '1',
      rest: ['c', 'flour,', 'divided'],
    });
  });
});

describe('getRangedAmount', () => {
  it('no ranges', () => {
    expect(getRangedAmount('1 c salt')).toBeUndefined();
    expect(getRangedAmount('1 c salt, optional')).toBeUndefined();
    expect(getRangedAmount('1 c salt, to taste')).toBeUndefined();
    expect(getRangedAmount('1/2 c four, divided')).toBeUndefined();
  });

  it('X to Y ranges', () => {
    expect(getRangedAmount('1 to 2 c salt')).toEqual({
      match: { min: '1', max: '2' },
      rest: ['c', 'salt'],
    });
    expect(getRangedAmount('1/2 to 3/4 c salt, optional')).toEqual({
      match: { min: '1/2', max: '3/4' },
      rest: ['c', 'salt,', 'optional'],
    });
    expect(getRangedAmount('1 to 1 1/2 c salt, to taste')).toEqual({
      match: { min: '1', max: '1 1/2' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getRangedAmount('1 to 1.5 c salt, to taste')).toEqual({
      match: { min: '1', max: '1.5' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getRangedAmount('1 1/3 to 1 1/2 c flour, divided')).toEqual({
      match: { min: '1 1/3', max: '1 1/2' },
      rest: ['c', 'flour,', 'divided'],
    });
  });

  it('XtoY ranges', () => {
    expect(getRangedAmount('1to2 c salt')).toEqual({
      match: { min: '1', max: '2' },
      rest: ['c', 'salt'],
    });
    expect(getRangedAmount('1/2to3/4 c salt, optional')).toEqual({
      match: { min: '1/2', max: '3/4' },
      rest: ['c', 'salt,', 'optional'],
    });
    expect(getRangedAmount('1to1 1/2 c salt, to taste')).toEqual({
      match: { min: '1', max: '1 1/2' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getRangedAmount('1to1.5 c salt, to taste')).toEqual({
      match: { min: '1', max: '1.5' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getRangedAmount('1 1/3to1 1/2 c flour, divided')).toEqual({
      match: { min: '1 1/3', max: '1 1/2' },
      rest: ['c', 'flour,', 'divided'],
    });
  });

  it('X - Y ranges', () => {
    expect(getRangedAmount('1 - 2 c salt')).toEqual({
      match: { min: '1', max: '2' },
      rest: ['c', 'salt'],
    });
    expect(getRangedAmount('1/2 - 3/4 c salt, optional')).toEqual({
      match: { min: '1/2', max: '3/4' },
      rest: ['c', 'salt,', 'optional'],
    });
    expect(getRangedAmount('1 - 1 1/2 c salt, to taste')).toEqual({
      match: { min: '1', max: '1 1/2' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getRangedAmount('1 - 1.5 c salt, to taste')).toEqual({
      match: { min: '1', max: '1.5' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getRangedAmount('1 1/3 - 1 1/2 c flour, divided')).toEqual({
      match: { min: '1 1/3', max: '1 1/2' },
      rest: ['c', 'flour,', 'divided'],
    });
  });

  it('X-Y ranges', () => {
    expect(getRangedAmount('1-2 c salt')).toEqual({
      match: { min: '1', max: '2' },
      rest: ['c', 'salt'],
    });
    expect(getRangedAmount('1/2-3/4 c salt, optional')).toEqual({
      match: { min: '1/2', max: '3/4' },
      rest: ['c', 'salt,', 'optional'],
    });
    expect(getRangedAmount('1-1 1/2 c salt, to taste')).toEqual({
      match: { min: '1', max: '1 1/2' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getRangedAmount('1-1.5 c salt, to taste')).toEqual({
      match: { min: '1', max: '1.5' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getRangedAmount('1 1/3-1 1/2 c flour, divided')).toEqual({
      match: { min: '1 1/3', max: '1 1/2' },
      rest: ['c', 'flour,', 'divided'],
    });
  });
});

describe('getAmount', () => {
  it('no numbers', () => {
    expect(getAmount('c salt')).toBeUndefined();
    expect(getAmount('c salt #2')).toBeUndefined();
  });

  it('single numbers', () => {
    expect(getAmount('1 c salt')).toEqual({
      match: '1',
      rest: ['c', 'salt'],
    });
    expect(getAmount('1 c salt, optional')).toEqual({
      match: '1',
      rest: ['c', 'salt,', 'optional'],
    });
    expect(getAmount('1 c salt, to taste')).toEqual({
      match: '1',
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getAmount('1/2 c flour, divided')).toEqual({
      match: '1/2',
      rest: ['c', 'flour,', 'divided'],
    });
    expect(getAmount('1.5 c flour, divided')).toEqual({
      match: '1.5',
      rest: ['c', 'flour,', 'divided'],
    });
    expect(getAmount('1c flour, divided')).toEqual({
      match: '1',
      rest: ['c', 'flour,', 'divided'],
    });
  });

  it('X to Y ranges', () => {
    expect(getAmount('1 to 2 c salt')).toEqual({
      match: { min: '1', max: '2' },
      rest: ['c', 'salt'],
    });
    expect(getAmount('1/2 to 3/4 c salt, optional')).toEqual({
      match: { min: '1/2', max: '3/4' },
      rest: ['c', 'salt,', 'optional'],
    });
    expect(getAmount('1 to 1 1/2 c salt, to taste')).toEqual({
      match: { min: '1', max: '1 1/2' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getAmount('1 to 1.5 c salt, to taste')).toEqual({
      match: { min: '1', max: '1.5' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getAmount('1 1/3 to 1 1/2 c flour, divided')).toEqual({
      match: { min: '1 1/3', max: '1 1/2' },
      rest: ['c', 'flour,', 'divided'],
    });
  });

  it('XtoY ranges', () => {
    expect(getAmount('1to2 c salt')).toEqual({
      match: { min: '1', max: '2' },
      rest: ['c', 'salt'],
    });
    expect(getRangedAmount('1/2to3/4 c salt, optional')).toEqual({
      match: { min: '1/2', max: '3/4' },
      rest: ['c', 'salt,', 'optional'],
    });
    expect(getAmount('1to1 1/2 c salt, to taste')).toEqual({
      match: { min: '1', max: '1 1/2' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getAmount('1to1.5 c salt, to taste')).toEqual({
      match: { min: '1', max: '1.5' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getAmount('1 1/3to1 1/2 c flour, divided')).toEqual({
      match: { min: '1 1/3', max: '1 1/2' },
      rest: ['c', 'flour,', 'divided'],
    });
  });

  it('X - Y ranges', () => {
    expect(getAmount('1 - 2 c salt')).toEqual({
      match: { min: '1', max: '2' },
      rest: ['c', 'salt'],
    });
    expect(getAmount('1/2 - 3/4 c salt, optional')).toEqual({
      match: { min: '1/2', max: '3/4' },
      rest: ['c', 'salt,', 'optional'],
    });
    expect(getAmount('1 - 1 1/2 c salt, to taste')).toEqual({
      match: { min: '1', max: '1 1/2' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getAmount('1 - 1.5 c salt, to taste')).toEqual({
      match: { min: '1', max: '1.5' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getAmount('1 1/3 - 1 1/2 c flour, divided')).toEqual({
      match: { min: '1 1/3', max: '1 1/2' },
      rest: ['c', 'flour,', 'divided'],
    });
  });

  it('X-Y ranges', () => {
    expect(getAmount('1-2 c salt')).toEqual({
      match: { min: '1', max: '2' },
      rest: ['c', 'salt'],
    });
    expect(getAmount('1/2-3/4 c salt, optional')).toEqual({
      match: { min: '1/2', max: '3/4' },
      rest: ['c', 'salt,', 'optional'],
    });
    expect(getAmount('1-1 1/2 c salt, to taste')).toEqual({
      match: { min: '1', max: '1 1/2' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getAmount('1-1.5 c salt, to taste')).toEqual({
      match: { min: '1', max: '1.5' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getAmount('1 1/3-1 1/2 c flour, divided')).toEqual({
      match: { min: '1 1/3', max: '1 1/2' },
      rest: ['c', 'flour,', 'divided'],
    });
  });
});
