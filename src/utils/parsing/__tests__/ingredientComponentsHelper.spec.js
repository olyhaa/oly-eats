import {
  isNumeric,
  isFraction,
  isNumber,
  isUnitOfMeasure,
  unitNormalizer,
  getRangedAmount,
  getNumber,
  getAmount,
  checkForMatch,
  findMatch,
  getUnit,
  getByWeight,
  getOptional,
  getToTaste,
  getParenText,
  getCommaText,
  getPrep,
  removeBeginningEndNoise,
  removeNoise,
  addStrWithSpace,
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
  it('capitalized', () => {
    expect(unitNormalizer('Tablespoon')).toBe('tablespoon');
    expect(unitNormalizer('Cup')).toBe('cup');
    expect(unitNormalizer('Can')).toBe('can');
    expect(unitNormalizer('Pound')).toBe('pound');
    expect(unitNormalizer('Ounce')).toBe('ounce');
    expect(unitNormalizer('OunCe')).toBe('ounce');
    expect(unitNormalizer('OUNCE')).toBe('ounce');
  });

  it('top-level unit', () => {
    expect(unitNormalizer('tablespoon')).toBe('tablespoon');
    expect(unitNormalizer('teaspoon')).toBe('teaspoon');
    expect(unitNormalizer('quart')).toBe('quart');
    expect(unitNormalizer('ounce')).toBe('ounce');
    expect(unitNormalizer('whole')).toBe('whole');
    expect(unitNormalizer('bottle')).toBe('bottle');
    expect(unitNormalizer('pound')).toBe('pound');
  });

  it('expanded unit', () => {
    expect(unitNormalizer('T')).toBe('tablespoon');
    expect(unitNormalizer('Tbs')).toBe('tablespoon');
    expect(unitNormalizer('tbs')).toBe('tablespoon');
    expect(unitNormalizer('t')).toBe('teaspoon');
    expect(unitNormalizer('tsp')).toBe('teaspoon');
    expect(unitNormalizer('c')).toBe('cup');
    expect(unitNormalizer('oz')).toBe('ounce');
    expect(unitNormalizer('"')).toBe('inch');
    expect(unitNormalizer('pkg')).toBe('package');
  });

  it('plural top-level unit', () => {
    expect(unitNormalizer('tablespoons')).toBe('tablespoon');
    expect(unitNormalizer('teaspoons')).toBe('teaspoon');
    expect(unitNormalizer('quarts')).toBe('quart');
    expect(unitNormalizer('ounces')).toBe('ounce');
    expect(unitNormalizer('bottles')).toBe('bottle');
    expect(unitNormalizer('pounds')).toBe('pound');
  });

  it('plural expanded unit', () => {
    expect(unitNormalizer('Tbsps')).toBe('tablespoon');
    expect(unitNormalizer('tsps')).toBe('teaspoon');
    expect(unitNormalizer('pkgs')).toBe('package');
  });
});

describe('getNumber', () => {
  it('no numbers', () => {
    const valsToTest = ['c salt', 'c salt #2'];
    valsToTest.forEach((name) => {
      expect(getRangedAmount(name.split(' '))).toEqual({
        rest: name.split(' '),
      });
    });
  });

  it('single numbers', () => {
    expect(getNumber('1 c salt'.split(' '))).toEqual({
      match: '1',
      rest: ['c', 'salt'],
    });
    expect(getNumber('1 c salt, optional'.split(' '))).toEqual({
      match: '1',
      rest: ['c', 'salt,', 'optional'],
    });
    expect(getNumber('1 c salt, to taste'.split(' '))).toEqual({
      match: '1',
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getNumber('1/2 c flour, divided'.split(' '))).toEqual({
      match: '1/2',
      rest: ['c', 'flour,', 'divided'],
    });
    expect(getNumber('1.5 c flour, divided'.split(' '))).toEqual({
      match: '1.5',
      rest: ['c', 'flour,', 'divided'],
    });
    expect(getNumber('1c flour, divided'.split(' '))).toEqual({
      match: '1',
      rest: ['c', 'flour,', 'divided'],
    });
  });
});

describe('getRangedAmount', () => {
  it('no ranges', () => {
    const valsToTest = [
      '1 c salt',
      '1 c salt, optional',
      '1 c salt, to taste',
      '1/2 c four, divided',
    ];
    valsToTest.forEach((name) => {
      expect(getRangedAmount(name.split(' '))).toEqual({
        rest: name.split(' '),
      });
    });
  });

  it('X to Y ranges', () => {
    expect(getRangedAmount('1 to 2 c salt'.split(' '))).toEqual({
      match: { min: '1', max: '2' },
      rest: ['c', 'salt'],
    });
    expect(getRangedAmount('1/2 to 3/4 c salt, optional'.split(' '))).toEqual({
      match: { min: '1/2', max: '3/4' },
      rest: ['c', 'salt,', 'optional'],
    });
    expect(getRangedAmount('1 to 1 1/2 c salt, to taste'.split(' '))).toEqual({
      match: { min: '1', max: '1 1/2' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getRangedAmount('1 to 1.5 c salt, to taste'.split(' '))).toEqual({
      match: { min: '1', max: '1.5' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(
      getRangedAmount('1 1/3 to 1 1/2 c flour, divided'.split(' '))
    ).toEqual({
      match: { min: '1 1/3', max: '1 1/2' },
      rest: ['c', 'flour,', 'divided'],
    });
  });

  it('XtoY ranges', () => {
    expect(getRangedAmount('1to2 c salt'.split(' '))).toEqual({
      match: { min: '1', max: '2' },
      rest: ['c', 'salt'],
    });
    expect(getRangedAmount('1/2to3/4 c salt, optional'.split(' '))).toEqual({
      match: { min: '1/2', max: '3/4' },
      rest: ['c', 'salt,', 'optional'],
    });
    expect(getRangedAmount('1to1 1/2 c salt, to taste'.split(' '))).toEqual({
      match: { min: '1', max: '1 1/2' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getRangedAmount('1to1.5 c salt, to taste'.split(' '))).toEqual({
      match: { min: '1', max: '1.5' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getRangedAmount('1 1/3to1 1/2 c flour, divided'.split(' '))).toEqual(
      {
        match: { min: '1 1/3', max: '1 1/2' },
        rest: ['c', 'flour,', 'divided'],
      }
    );
  });

  it('X - Y ranges', () => {
    expect(getRangedAmount('1 - 2 c salt'.split(' '))).toEqual({
      match: { min: '1', max: '2' },
      rest: ['c', 'salt'],
    });
    expect(getRangedAmount('1/2 - 3/4 c salt, optional'.split(' '))).toEqual({
      match: { min: '1/2', max: '3/4' },
      rest: ['c', 'salt,', 'optional'],
    });
    expect(getRangedAmount('1 - 1 1/2 c salt, to taste'.split(' '))).toEqual({
      match: { min: '1', max: '1 1/2' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getRangedAmount('1 - 1.5 c salt, to taste'.split(' '))).toEqual({
      match: { min: '1', max: '1.5' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(
      getRangedAmount('1 1/3 - 1 1/2 c flour, divided'.split(' '))
    ).toEqual({
      match: { min: '1 1/3', max: '1 1/2' },
      rest: ['c', 'flour,', 'divided'],
    });
  });

  it('X-Y ranges', () => {
    expect(getRangedAmount('1-2 c salt'.split(' '))).toEqual({
      match: { min: '1', max: '2' },
      rest: ['c', 'salt'],
    });
    expect(getRangedAmount('1/2-3/4 c salt, optional'.split(' '))).toEqual({
      match: { min: '1/2', max: '3/4' },
      rest: ['c', 'salt,', 'optional'],
    });
    expect(getRangedAmount('1-1 1/2 c salt, to taste'.split(' '))).toEqual({
      match: { min: '1', max: '1 1/2' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getRangedAmount('1-1.5 c salt, to taste'.split(' '))).toEqual({
      match: { min: '1', max: '1.5' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getRangedAmount('1 1/3-1 1/2 c flour, divided'.split(' '))).toEqual({
      match: { min: '1 1/3', max: '1 1/2' },
      rest: ['c', 'flour,', 'divided'],
    });
  });
});

describe('getAmount', () => {
  it('no numbers', () => {
    const valsToTest = [' c salt', 'c salt', 'c salt #2'];
    valsToTest.forEach((name) => {
      expect(getAmount(name.split(' '))).toEqual({
        rest: name.split(' '),
      });
    });
  });

  it('single numbers', () => {
    expect(getAmount('1 c salt'.split(' '))).toEqual({
      match: '1',
      rest: ['c', 'salt'],
    });
    expect(getAmount('1 c salt, optional'.split(' '))).toEqual({
      match: '1',
      rest: ['c', 'salt,', 'optional'],
    });
    expect(getAmount('1 c salt, to taste'.split(' '))).toEqual({
      match: '1',
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getAmount('1/2 c flour, divided'.split(' '))).toEqual({
      match: '1/2',
      rest: ['c', 'flour,', 'divided'],
    });
    expect(getAmount('1.5 c flour, divided'.split(' '))).toEqual({
      match: '1.5',
      rest: ['c', 'flour,', 'divided'],
    });
    expect(getAmount('1c flour, divided'.split(' '))).toEqual({
      match: '1',
      rest: ['c', 'flour,', 'divided'],
    });
  });

  it('X to Y ranges', () => {
    expect(getAmount('1 to 2 c salt'.split(' '))).toEqual({
      match: { min: '1', max: '2' },
      rest: ['c', 'salt'],
    });
    expect(getAmount('1/2 to 3/4 c salt, optional'.split(' '))).toEqual({
      match: { min: '1/2', max: '3/4' },
      rest: ['c', 'salt,', 'optional'],
    });
    expect(getAmount('1 to 1 1/2 c salt, to taste'.split(' '))).toEqual({
      match: { min: '1', max: '1 1/2' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getAmount('1 to 1.5 c salt, to taste'.split(' '))).toEqual({
      match: { min: '1', max: '1.5' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getAmount('1 1/3 to 1 1/2 c flour, divided'.split(' '))).toEqual({
      match: { min: '1 1/3', max: '1 1/2' },
      rest: ['c', 'flour,', 'divided'],
    });
  });

  it('XtoY ranges', () => {
    expect(getAmount('1to2 c salt'.split(' '))).toEqual({
      match: { min: '1', max: '2' },
      rest: ['c', 'salt'],
    });
    expect(getRangedAmount('1/2to3/4 c salt, optional'.split(' '))).toEqual({
      match: { min: '1/2', max: '3/4' },
      rest: ['c', 'salt,', 'optional'],
    });
    expect(getAmount('1to1 1/2 c salt, to taste'.split(' '))).toEqual({
      match: { min: '1', max: '1 1/2' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getAmount('1to1.5 c salt, to taste'.split(' '))).toEqual({
      match: { min: '1', max: '1.5' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getAmount('1 1/3to1 1/2 c flour, divided'.split(' '))).toEqual({
      match: { min: '1 1/3', max: '1 1/2' },
      rest: ['c', 'flour,', 'divided'],
    });
  });

  it('X - Y ranges', () => {
    expect(getAmount('1 - 2 c salt'.split(' '))).toEqual({
      match: { min: '1', max: '2' },
      rest: ['c', 'salt'],
    });
    expect(getAmount('1/2 - 3/4 c salt, optional'.split(' '))).toEqual({
      match: { min: '1/2', max: '3/4' },
      rest: ['c', 'salt,', 'optional'],
    });
    expect(getAmount('1 - 1 1/2 c salt, to taste'.split(' '))).toEqual({
      match: { min: '1', max: '1 1/2' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getAmount('1 - 1.5 c salt, to taste'.split(' '))).toEqual({
      match: { min: '1', max: '1.5' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getAmount('1 1/3 - 1 1/2 c flour, divided'.split(' '))).toEqual({
      match: { min: '1 1/3', max: '1 1/2' },
      rest: ['c', 'flour,', 'divided'],
    });
  });

  it('X-Y ranges', () => {
    expect(getAmount('1-2 c salt'.split(' '))).toEqual({
      match: { min: '1', max: '2' },
      rest: ['c', 'salt'],
    });
    expect(getAmount('1/2-3/4 c salt, optional'.split(' '))).toEqual({
      match: { min: '1/2', max: '3/4' },
      rest: ['c', 'salt,', 'optional'],
    });
    expect(getAmount('1-1 1/2 c salt, to taste'.split(' '))).toEqual({
      match: { min: '1', max: '1 1/2' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getAmount('1-1.5 c salt, to taste'.split(' '))).toEqual({
      match: { min: '1', max: '1.5' },
      rest: ['c', 'salt,', 'to', 'taste'],
    });
    expect(getAmount('1 1/3-1 1/2 c flour, divided'.split(' '))).toEqual({
      match: { min: '1 1/3', max: '1 1/2' },
      rest: ['c', 'flour,', 'divided'],
    });
  });
});

describe('checkForMatch', () => {
  it('empty params', () => {
    expect(checkForMatch([], ['first', 'second', 'third'], 0)).toEqual(0);
    expect(checkForMatch(['first'], [], 0)).toEqual(-1);
  });

  it('find match', () => {
    expect(
      checkForMatch(['first', 'second'], ['first', 'second', 'third'], 0)
    ).toEqual(0);
    expect(
      checkForMatch(['first', 'second'], ['First', 'Second', 'third'], 0)
    ).toEqual(0);
    expect(
      checkForMatch(['FIRST', 'second'], ['First', 'Second', 'third'], 0)
    ).toEqual(0);
    expect(checkForMatch(['first'], ['(first)', 'second', 'third'], 0)).toEqual(
      0
    );
    expect(
      checkForMatch(['second', 'third'], ['first', 'second', 'third'], 0)
    ).toEqual(1);
    expect(
      checkForMatch(['second', 'third'], ['first', 'second', 'third'], 1)
    ).toEqual(1);
    expect(checkForMatch(['first'], ['first', 'second', 'third'], 0)).toEqual(
      0
    );
    expect(checkForMatch(['third'], ['first', 'second', 'third'], 0)).toEqual(
      2
    );
  });

  it('no match', () => {
    expect(checkForMatch(['fourth'], ['first', 'second', 'third'], 0)).toEqual(
      -1
    );
    expect(
      checkForMatch(['second', 'third'], ['first', 'second', 'third'], 2)
    ).toEqual(-1);
    expect(checkForMatch(['first'], ['first', 'second', 'third'], 1)).toEqual(
      -1
    );
  });
});

describe('findMatch', () => {
  const testList = ['first', 'second', 'third', 'fourth'];
  it('empty params', () => {
    expect(findMatch([], testList)).toEqual({ match: [], rest: testList });
    expect(findMatch(undefined, testList)).toEqual({ rest: testList });
    expect(findMatch([' '], testList)).toEqual({ rest: testList });
  });

  it('no matches', () => {
    expect(findMatch(['first', 'third'], testList)).toEqual({ rest: testList });
    expect(findMatch(['fifth'], testList)).toEqual({ rest: testList });
  });

  it('matches', () => {
    expect(findMatch(['first'], testList)).toEqual({
      match: ['first'],
      rest: testList.slice(1),
    });
    expect(findMatch(['first', 'second'], testList)).toEqual({
      match: ['first', 'second'],
      rest: testList.slice(2),
    });
    expect(findMatch(['FIRST'], testList)).toEqual({
      match: ['FIRST'],
      rest: testList.slice(1),
    });
    expect(findMatch(testList, testList)).toEqual({
      match: testList,
      rest: [],
    });
    expect(findMatch(['second', 'third'], testList)).toEqual({
      match: ['second', 'third'],
      rest: ['first', 'fourth'],
    });
  });
});

describe('getUnit', () => {
  describe('singulars', () => {
    const testCases = {
      'tablespoon honey': { match: 'tablespoon', rest: ['honey'] },
      'T honey': { match: 'tablespoon', rest: ['honey'] },
      'Tbs honey': { match: 'tablespoon', rest: ['honey'] },
      'tbs honey': { match: 'tablespoon', rest: ['honey'] },
      'Tbsp honey': { match: 'tablespoon', rest: ['honey'] },
      'teaspoon honey': { match: 'teaspoon', rest: ['honey'] },
      'can evaporated milk': { match: 'can', rest: ['evaporated', 'milk'] },
      'quart honey': { match: 'quart', rest: ['honey'] },
      'ounce honey': { match: 'ounce', rest: ['honey'] },
      'c honey': { match: 'cup', rest: ['honey'] },
      'Cup honey': { match: 'cup', rest: ['honey'] },
      'cup honey': { match: 'cup', rest: ['honey'] },
      'clove garlic': { match: 'clove', rest: ['garlic'] },
      'tsp cloves': { match: 'teaspoon', rest: ['cloves'] },
    };

    Object.keys(testCases).forEach((name) => {
      const expected = testCases[name];
      it(`Should parse ${name}`, () => {
        expect(getUnit(name.split(' '))).toEqual(expected);
      });
    });
  });

  describe('plurals', () => {
    const testCases = {
      'tablespoons honey': { match: 'tablespoon', rest: ['honey'] },
      'teaspoons honey': { match: 'teaspoon', rest: ['honey'] },
      'cans evaporated milk': { match: 'can', rest: ['evaporated', 'milk'] },
      'ounces honey': { match: 'ounce', rest: ['honey'] },
      'Cups honey': { match: 'cup', rest: ['honey'] },
      'lbs honey': { match: 'pound', rest: ['honey'] },
      'pinches salt': { match: 'pinch', rest: ['salt'] },
      'cloves garlic': { match: 'clove', rest: ['garlic'] },
    };

    Object.keys(testCases).forEach((name) => {
      const expected = testCases[name];
      it(`Should parse ${name}`, () => {
        expect(getUnit(name.split(' '))).toEqual(expected);
      });
    });
  });

  it('non-units', () => {
    expect(getUnit(['apple'])).toEqual({ rest: ['apple'] });
    expect(getUnit('apples, chopped'.split(' '))).toEqual({
      rest: ['apples,', 'chopped'],
    });
  });
});

describe('getByWeight', () => {
  describe('not by weight', () => {
    const testCases = ['by apples weighted', 'apples', 'apples, chopped'];
    testCases.forEach((name) => {
      const expected = { rest: name.split(' ') };
      it(`Should parse ${name}`, () => {
        expect(getByWeight(name.split(' '))).toEqual(expected);
      });
    });
  });

  describe('is by weight', () => {
    const testCases = {
      'apples, by weight': { match: ['by', 'weight'], rest: ['apples,'] },
      'by weight water': { match: ['by', 'weight'], rest: ['water'] },
    };

    Object.keys(testCases).forEach((name) => {
      const expected = testCases[name];
      it(`Should parse ${name}`, () => {
        expect(getByWeight(name.split(' '))).toEqual(expected);
      });
    });
  });
});

describe('getOptional', () => {
  describe('not optional', () => {
    const testCases = ['opt apples', 'apples', 'apples, chopped'];
    testCases.forEach((name) => {
      const expected = { rest: name.split(' ') };
      it(`Should parse ${name}`, () => {
        expect(getOptional(name.split(' '))).toEqual(expected);
      });
    });
  });

  describe('is optional', () => {
    const testCases = {
      'apples, optional': { match: ['optional'], rest: ['apples,'] },
      'apples (optional)': { match: ['optional'], rest: ['apples'] },
      'optional water': { match: ['optional'], rest: ['water'] },
    };

    Object.keys(testCases).forEach((name) => {
      const expected = testCases[name];
      it(`Should parse ${name}`, () => {
        expect(getOptional(name.split(' '))).toEqual(expected);
      });
    });
  });
});

describe('getToTaste', () => {
  describe('not to taste', () => {
    const testCases = [
      'to salt taste',
      'apples',
      'apples, chopped',
      'taste to salt',
    ];
    testCases.forEach((name) => {
      const expected = { rest: name.split(' ') };
      it(`Should parse ${name}`, () => {
        expect(getToTaste(name.split(' '))).toEqual(expected);
      });
    });
  });

  describe('is to taste', () => {
    const testCases = {
      'apples, to taste': { match: ['to', 'taste'], rest: ['apples,'] },
      'to taste salt': { match: ['to', 'taste'], rest: ['salt'] },
    };

    Object.keys(testCases).forEach((name) => {
      const expected = testCases[name];
      it(`Should parse ${name}`, () => {
        expect(getToTaste(name.split(' '))).toEqual(expected);
      });
    });
  });
});

describe('getParenText', () => {
  describe('no match', () => {
    const testCases = [
      'medium apples',
      'medium apples ( with style',
      'medium apples ) with style',
    ];

    testCases.forEach((name) => {
      const expected = { rest: name.split(' ') };
      it(`Should parse ${name}`, () => {
        expect(getParenText(name.split(' '))).toEqual(expected);
      });
    });
  });

  describe('has match', () => {
    const testCases = {
      'apples (chopped)': { match: ['chopped'], rest: ['apples'] },
      'apples (chopped large)': { match: ['chopped large'], rest: ['apples'] },
      'apples ()': { match: [''], rest: ['apples'] },
      'apples (chopped) large': {
        match: ['chopped'],
        rest: ['apples', 'large'],
      },
    };

    Object.keys(testCases).forEach((name) => {
      const expected = testCases[name];
      it(`Should parse ${name}`, () => {
        expect(getParenText(name.split(' '))).toEqual(expected);
      });
    });
  });
});

describe('getCommaText', () => {
  describe("doesn't have comma", () => {
    const testCases = ['apples', 'apples chopped'];
    testCases.forEach((name) => {
      const expected = { rest: name.split(' ') };
      it(`Should parse ${name}`, () => {
        expect(getCommaText(name.split(' '))).toEqual(expected);
      });
    });
  });

  describe('has comma', () => {
    const testCases = {
      'apples, chopped': { match: ['chopped'], rest: ['apples'] },
      'apples, peeled, and chopped': {
        match: ['peeled, and chopped'],
        rest: ['apples'],
      },
      'apples,': { match: [''], rest: ['apples'] },
      ', apples': { match: ['apples'], rest: [''] },
    };

    Object.keys(testCases).forEach((name) => {
      const expected = testCases[name];
      it(`Should parse ${name}`, () => {
        expect(getCommaText(name.split(' '))).toEqual(expected);
      });
    });
  });
});

describe('removeBeginningEndNoise', () => {
  describe('no noise', () => {
    const testCases = ['trimmed and washed', 'trimmed', 'diced, washed'];

    testCases.forEach((name) => {
      it(`Should parse ${name}`, () => {
        expect(removeBeginningEndNoise(name)).toEqual(name);
      });
    });
  });

  describe('has noise', () => {
    const testCases = {
      'and trimmed and washed': 'trimmed and washed',
      'trimmed and': 'trimmed',
      'And diced, washed': 'diced, washed',
      'washed and ': 'washed',
    };

    Object.keys(testCases).forEach((name) => {
      const expected = testCases[name];
      it(`Should parse ${name}`, () => {
        expect(removeBeginningEndNoise(name)).toEqual(expected);
      });
    });
  });
});

describe('getPrep', () => {
  describe("doesn't have prep", () => {
    const testCases = [
      'apples',
      'apples chopped',
      'medium apples ( with style',
      'medium apples ) with style',
    ];
    testCases.forEach((name) => {
      const expected = { rest: name.split(' ') };
      it(`Should parse ${name}`, () => {
        expect(getPrep(name.split(' '))).toEqual(expected);
      });
    });
  });

  describe('has prep', () => {
    const testCases = {
      'apples, chopped': { match: ['chopped'], rest: ['apples'] },
      'apples, peeled, and chopped': {
        match: ['peeled, and chopped'],
        rest: ['apples'],
      },
      'apples,': { rest: ['apples'] },
      ', apples': { match: ['apples'], rest: [''] },
      'apples (chopped)': { match: ['chopped'], rest: ['apples'] },
      'apples (chopped) large': {
        match: ['chopped'],
        rest: ['apples', 'large'],
      },
      'apples (chopped), and peeled': {
        match: ['chopped, peeled'],
        rest: ['apples'],
      },
      'apples, peeled (and chopped)': {
        match: ['chopped, peeled'],
        rest: ['apples'],
      },
      'medium yellow onion — 1/4-inch diced': {
        match: ['1/4-inch diced'],
        rest: ['medium', 'yellow', 'onion'],
      },
      'apples ()': { rest: ['apples'] },
    };

    Object.keys(testCases).forEach((name) => {
      const expected = testCases[name];
      it(`Should parse ${name}`, () => {
        expect(getPrep(name.split(' '))).toEqual(expected);
      });
    });
  });
});

describe('removeNoise', () => {
  describe('remove commas', () => {
    const testCases = {
      'apples, and more': 'apples and more',
      'apple, ': 'apple',
    };

    Object.keys(testCases).forEach((name) => {
      const expected = testCases[name];
      it(`Should parse ${name}`, () => {
        expect(removeNoise(name.split(' '))).toEqual(expected.split(' '));
      });
    });
  });

  describe('remove noise words', () => {
    const testCases = {
      'a banana': 'banana',
      'banana a': 'banana',
      'an apple, ': 'apple',
      'apple an, ': 'apple',
      'apple of': 'apple',
      'of apple': 'apple',
    };

    Object.keys(testCases).forEach((name) => {
      const expected = testCases[name];
      it(`Should parse ${name}`, () => {
        expect(removeNoise(name.split(' '))).toEqual(expected.split(' '));
      });
    });
  });

  describe('complex', () => {
    const testCases = {
      'a banana of size': 'banana size',
      'of banana a': 'banana',
      'of an apple, ': 'apple',
      'of apple an, ': 'apple',
      'an apple of': 'apple',
      'of an apple': 'apple',
    };

    Object.keys(testCases).forEach((name) => {
      const expected = testCases[name];
      it(`Should parse ${name}`, () => {
        expect(removeNoise(name.split(' '))).toEqual(expected.split(' '));
      });
    });
  });
});

describe('addStrWithSpace', () => {
  it('two strings, no commas', () => {
    expect(addStrWithSpace('first', 'second')).toEqual('first second');
    expect(addStrWithSpace(' first ', 'second')).toEqual('first second');
    expect(addStrWithSpace('first', ' second ')).toEqual('first second');
    expect(addStrWithSpace('   first ', '  second ')).toEqual('first second');
  });

  it('two strings, with commas', () => {
    expect(addStrWithSpace('first', 'second', true)).toEqual('first, second');
    expect(addStrWithSpace(' first ', 'second', true)).toEqual('first, second');
    expect(addStrWithSpace('first', ' second ', true)).toEqual('first, second');
    expect(addStrWithSpace('   first ', '  second ', true)).toEqual(
      'first, second'
    );
  });

  it('empty first string', () => {
    expect(addStrWithSpace('', 'second')).toEqual('second');
    expect(addStrWithSpace(undefined, 'second')).toEqual('second');
    expect(addStrWithSpace('', ' second ', true)).toEqual('second');
    expect(addStrWithSpace(undefined, '  second ', true)).toEqual('second');
  });

  it('empty second string', () => {
    expect(addStrWithSpace('first', '')).toEqual('first');
    expect(addStrWithSpace('first', undefined)).toEqual('first');
    expect(addStrWithSpace('first', '', true)).toEqual('first');
    expect(addStrWithSpace('first', undefined, true)).toEqual('first');
  });
});
