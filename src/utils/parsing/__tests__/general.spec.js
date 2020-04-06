import { convertUnicodeFractions } from '../general';

describe('convertUnicodeFractions', () => {
  describe('No unicode fractions', () => {
    const testCases = [
      '1 Cup Flour',
      '2/3 Cup Flour',
      '4/5 Cup Flour',
      '1.2 Cup Flour',
      'Cup Flour',
    ];

    testCases.forEach((name) => {
      it(`Should convert ${name}`, () => {
        expect(convertUnicodeFractions(name)).toEqual(name);
      });
    });
  });

  describe('Has unicode fractions', () => {
    const testCases = {
      '½ cup flour': '1/2 cup flour',
      '⅒ cup flour': '1/10 cup flour',
      '⅓ - ⅔ cup flour': '1/3 - 2/3 cup flour',
      '⅘ Cup Flour, ⅘ high': '4/5 Cup Flour, 4/5 high',
    };

    Object.keys(testCases).forEach((name) => {
      it(`Should convert ${name}`, () => {
        expect(convertUnicodeFractions(name)).toEqual(testCases[name]);
      });
    });
  });
});
