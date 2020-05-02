import { parseTiming } from '../saveRecipe';
import { TIMING_UNITS } from '../../../../utils/recipeConstants';

describe('transformTiming', () => {
  it('Only Minutes', () => {
    expect(parseTiming('0', undefined)).toEqual([]);
    expect(parseTiming('10', undefined)).toEqual([
      {
        value: '10',
        units: TIMING_UNITS.MINUTE,
      },
    ]);
    expect(parseTiming('60', undefined)).toEqual([
      {
        value: '1',
        units: TIMING_UNITS.HOUR,
      },
    ]);
    expect(parseTiming('90', undefined)).toEqual([
      {
        value: '30',
        units: TIMING_UNITS.MINUTE,
      },
      {
        value: '1',
        units: TIMING_UNITS.HOUR,
      },
    ]);
    expect(parseTiming('10', '0')).toEqual([
      {
        value: '10',
        units: TIMING_UNITS.MINUTE,
      },
    ]);
  });

  it('Only Hours', () => {
    expect(parseTiming(undefined, '0')).toEqual([]);
    expect(parseTiming(undefined, '10')).toEqual([
      {
        value: '10',
        units: TIMING_UNITS.HOUR,
      },
    ]);
    expect(parseTiming(undefined, '60')).toEqual([
      {
        value: '60',
        units: TIMING_UNITS.HOUR,
      },
    ]);
    expect(parseTiming(undefined, '90')).toEqual([
      {
        value: '90',
        units: TIMING_UNITS.HOUR,
      },
    ]);
    expect(parseTiming('0', '90')).toEqual([
      {
        value: '90',
        units: TIMING_UNITS.HOUR,
      },
    ]);
  });

  it('Mix of Hours and Minutes', () => {
    expect(parseTiming('0', '0')).toEqual([]);
    expect(parseTiming('20', '1')).toEqual([
      {
        value: '20',
        units: TIMING_UNITS.MINUTE,
      },
      {
        value: '1',
        units: TIMING_UNITS.HOUR,
      },
    ]);
    expect(parseTiming('70', '1')).toEqual([
      {
        value: '10',
        units: TIMING_UNITS.MINUTE,
      },
      {
        value: '2',
        units: TIMING_UNITS.HOUR,
      },
    ]);
  });
});
