import {
  isNumeric,
  isFraction,
  isNumber,
  properCase,
  isUnitOfMeasure,
  unitNormalizer,
  getRangedAmount,
} from '../ingredientComponentsHelper';

describe('isNumeric', () => {
  it('numeric number', () => {
    expect(isNumeric(1)).toBe(true);
    expect(isNumeric(0)).toBe(true);
    expect(isNumeric(10)).toBe(true);
  });

  it('numeric string', () => {
    expect(isNumeric('1')).toBe(true);
    expect(isNumeric('0')).toBe(true);
    expect(isNumeric('10')).toBe(true);
  });

  it('decimal number', () => {
    expect(isNumeric(1.5)).toBe(true);
    expect(isNumeric(0.75)).toBe(true);
    expect(isNumeric(0.25)).toBe(true);
    expect(isNumeric(1.0)).toBe(true);
  });

  it('decimal string', () => {
    expect(isNumeric('1.5')).toBe(true);
    expect(isNumeric('0.75')).toBe(true);
    expect(isNumeric('0.25')).toBe(true);
    expect(isNumeric('1.0')).toBe(true);
  });

  it('fractional string', () => {
    expect(isNumeric('1/2')).toBe(false);
    expect(isNumeric('3/4')).toBe(false);
    expect(isNumeric('1 1/2')).toBe(false);
  });

  it('string with numbers', () => {
    expect(isNumeric('abc1/2')).toBe(false);
    expect(isNumeric('4pop')).toBe(false);
    expect(isNumeric('see4me')).toBe(false);
  });

  it('string', () => {
    expect(isNumeric('abc')).toBe(false);
  });

  it('empty', () => {
    expect(isNumeric('')).toBe(false);
    expect(isNumeric()).toBe(false);
    expect(isNumeric(undefined)).toBe(false);
    expect(isNumeric(null)).toBe(false);
  });
});

describe('isFraction', () => {
  it('numeric number', () => {
    expect(isFraction(1)).toBe(false);
    expect(isFraction(0)).toBe(false);
    expect(isFraction(10)).toBe(false);
  });

  it('numeric string', () => {
    expect(isFraction('1')).toBe(false);
    expect(isFraction('0')).toBe(false);
    expect(isFraction('10')).toBe(false);
  });

  it('decimal number', () => {
    expect(isFraction(1.5)).toBe(false);
    expect(isFraction(0.75)).toBe(false);
    expect(isFraction(0.25)).toBe(false);
    expect(isFraction(1.0)).toBe(false);
  });

  it('decimal string', () => {
    expect(isFraction('1.5')).toBe(false);
    expect(isFraction('0.75')).toBe(false);
    expect(isFraction('0.25')).toBe(false);
    expect(isFraction('1.0')).toBe(false);
  });

  it('fractional string', () => {
    expect(isFraction('1/2')).toBe(true);
    expect(isFraction('3/4')).toBe(true);
    expect(isFraction('1 1/2')).toBe(true);
  });

  it('string with numbers', () => {
    expect(isFraction('abc1/2')).toBe(false);
    expect(isFraction('4pop')).toBe(false);
    expect(isFraction('see4me')).toBe(false);
  });

  it('string', () => {
    expect(isFraction('abc')).toBe(false);
  });

  it('empty', () => {
    expect(isFraction('')).toBe(false);
    expect(isFraction()).toBe(false);
    expect(isFraction(undefined)).toBe(false);
    expect(isFraction(null)).toBe(false);
  });
});

describe('isNumber', () => {
  it('numeric number', () => {
    expect(isNumber(1)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(10)).toBe(true);
  });

  it('numeric string', () => {
    expect(isNumber('1')).toBe(true);
    expect(isNumber('0')).toBe(true);
    expect(isNumber('10')).toBe(true);
  });

  it('decimal number', () => {
    expect(isNumber(1.5)).toBe(true);
    expect(isNumber(0.75)).toBe(true);
    expect(isNumber(0.25)).toBe(true);
    expect(isNumber(1.0)).toBe(true);
  });

  it('decimal string', () => {
    expect(isNumber('1.5')).toBe(true);
    expect(isNumber('0.75')).toBe(true);
    expect(isNumber('0.25')).toBe(true);
    expect(isNumber('1.0')).toBe(true);
  });

  it('fractional string', () => {
    expect(isNumber('1/2')).toBe(true);
    expect(isNumber('3/4')).toBe(true);
    expect(isNumber('1 1/2')).toBe(true);
  });

  it('string with numbers', () => {
    expect(isNumber('abc1/2')).toBe(false);
    expect(isNumber('4pop')).toBe(false);
    expect(isNumber('see4me')).toBe(false);
  });

  it('string', () => {
    expect(isNumber('abc')).toBe(false);
  });

  it('empty', () => {
    expect(isNumber('')).toBe(false);
    expect(isNumber()).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(null)).toBe(false);
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
    expect(properCase(undefined)).toBe(undefined);
    expect(properCase(null)).toBe(null);
    expect(properCase(1)).toBe(1);
  });
});

describe.skip('checkForMatch');

describe('isUnitOfMeasure', () => {
  it('singulars', () => {
    expect(isUnitOfMeasure('tablespoon')).toBe(true);
    expect(isUnitOfMeasure('T')).toBe(true);
    expect(isUnitOfMeasure('Tbs')).toBe(true);
    expect(isUnitOfMeasure('tbs')).toBe(true);
    expect(isUnitOfMeasure('Tbsp')).toBe(true);
    expect(isUnitOfMeasure('tbsp')).toBe(true);
    expect(isUnitOfMeasure('teaspoon')).toBe(true);
    expect(isUnitOfMeasure('can')).toBe(true);
    expect(isUnitOfMeasure('"')).toBe(true);
    expect(isUnitOfMeasure('quart')).toBe(true);
    expect(isUnitOfMeasure('ounce')).toBe(true);
    expect(isUnitOfMeasure('c')).toBe(true);
    expect(isUnitOfMeasure('Cup')).toBe(true);
    expect(isUnitOfMeasure('cup')).toBe(true);
  });

  it('plurals', () => {
    expect(isUnitOfMeasure('tablespoons')).toBe(true);
    expect(isUnitOfMeasure('teaspoons')).toBe(true);
    expect(isUnitOfMeasure('ounces')).toBe(true);
    expect(isUnitOfMeasure('Cups')).toBe(true);
    expect(isUnitOfMeasure('cups')).toBe(true);
    expect(isUnitOfMeasure('pounds')).toBe(true);
    expect(isUnitOfMeasure('Lbs')).toBe(true);
    expect(isUnitOfMeasure('lbs')).toBe(true);
    expect(isUnitOfMeasure('pinches')).toBe(true);
  });

  it('non-units', () => {
    expect(isUnitOfMeasure('')).toBe(false);
    expect(isUnitOfMeasure('apple')).toBe(false);
    expect(isUnitOfMeasure(null)).toBe(false);
    expect(isUnitOfMeasure(undefined)).toBe(false);
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

describe.only('getRangedAmount', () => {
  it('no ranges', () => {
    expect(getRangedAmount('1 c salt')).toBe(undefined);
    expect(getRangedAmount('1 c salt, optional')).toBe(undefined);
    expect(getRangedAmount('1 c salt, to taste')).toBe(undefined);
    expect(getRangedAmount('1/2 c four, divided')).toBe(undefined);
  });

  it.only('X to Y ranges', () => {
    expect(getRangedAmount('1 to 2 c salt')).equal({
      match: { min: '1', max: '2' },
      rest: ['c', 'salt'],
    });
    expect(getRangedAmount('1/2 to 3/4 c salt, optional')).equals({
      match: { min: '1/2', max: '3/4' },
      rest: ['c', 'salt,', 'optional'],
    });
    expect(getRangedAmount('1 to 1 1/2 c salt, to taste')).equals({
      match: { min: '1', max: '1 1/2' },
      rest: ['c', 'salt,', 'to taste'],
    });
    expect(getRangedAmount('1 1/3 to 1 1/2 c four, divided')).equals({
      match: { min: '1 1/3', max: '1 1/2' },
      rest: ['c', 'flour,', 'divided'],
    });
  });

  it('XtoY ranges', () => {
    expect(getRangedAmount('1to2 c salt')).toBe(undefined);
    expect(getRangedAmount('1/2to3/4 c salt, optional')).toBe(undefined);
    expect(getRangedAmount('1to1 1/2 c salt, to taste')).toBe(undefined);
    expect(getRangedAmount('1 1/3to1 1/2 c four, divided')).toBe(undefined);
  });

  it('X - Y ranges', () => {
    expect(getRangedAmount('1 - 2 c salt')).toBe(undefined);
    expect(getRangedAmount('1/2 - 3/4 c salt, optional')).toBe(undefined);
    expect(getRangedAmount('1 - 1 1/2 c salt, to taste')).toBe(undefined);
    expect(getRangedAmount('1 1/3 - 1 1/2 c four, divided')).toBe(undefined);
  });

  it('X-Y ranges', () => {
    expect(getRangedAmount('1-2 c salt')).toBe(undefined);
    expect(getRangedAmount('1/2-3/4 c salt, optional')).toBe(undefined);
    expect(getRangedAmount('1-1 1/2 c salt, to taste')).toBe(undefined);
    expect(getRangedAmount('1 1/3-1 1/2 c four, divided')).toBe(undefined);
  });
});
