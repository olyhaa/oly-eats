import { TIMING_UNITS } from '../recipeConstants';
import { convertUnicodeFractions, getDisplayTime } from '../formatters';

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

describe('getDisplayTime', () => {
  describe('Single item', () => {
    const testCases = {
      '35 minutes': [
        {
          value: '35',
          units: TIMING_UNITS.MINUTE,
        },
      ],
      '1 minute': [
        {
          value: '1',
          units: TIMING_UNITS.MINUTE,
        },
      ],
      '1 hour': [
        {
          value: '1',
          units: TIMING_UNITS.HOUR,
        },
      ],
      '2 hours': [
        {
          value: '2',
          units: TIMING_UNITS.HOUR,
        },
      ],
    };

    Object.keys(testCases).forEach((name) => {
      const timeArray = testCases[name];
      it(`Should convert ${name}`, () => {
        expect(getDisplayTime(timeArray)).toEqual(name);
      });
    });
  });

  describe('Multiple items', () => {
    const testCases = {
      '1 hour 35 minutes': [
        {
          value: '35',
          units: TIMING_UNITS.MINUTE,
        },
        {
          value: '1',
          units: TIMING_UNITS.HOUR,
        },
      ],
      '2 hours 35 minutes': [
        {
          value: '2',
          units: TIMING_UNITS.HOUR,
        },
        {
          value: '35',
          units: TIMING_UNITS.MINUTE,
        },
      ],
      '1 hour 1 minute': [
        {
          value: '1',
          units: TIMING_UNITS.MINUTE,
        },
        {
          value: '1',
          units: TIMING_UNITS.HOUR,
        },
      ],
    };

    Object.keys(testCases).forEach((name) => {
      const timeArray = testCases[name];
      it(`Should convert ${name}`, () => {
        expect(getDisplayTime(timeArray)).toEqual(name);
      });
    });
  });
});
