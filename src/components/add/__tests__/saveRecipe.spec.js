import { transformTiming } from '../saveRecipe';
import { TIMING_UNITS } from '../constants';

describe('transformTiming', () => {
  it('Only Minutes', () => {
    expect(transformTiming('0', undefined)).toEqual([]);
    expect(transformTiming('10', undefined)).toEqual([
      {
        value: '10',
        units: TIMING_UNITS.MINUTES,
      },
    ]);
    expect(transformTiming('60', undefined)).toEqual([
      {
        value: '1',
        units: TIMING_UNITS.HOURS,
      },
    ]);
    expect(transformTiming('90', undefined)).toEqual([
      {
        value: '30',
        units: TIMING_UNITS.MINUTES,
      },
      {
        value: '1',
        units: TIMING_UNITS.HOURS,
      },
    ]);
    expect(transformTiming('10', '0')).toEqual([
      {
        value: '10',
        units: TIMING_UNITS.MINUTES,
      },
    ]);
  });

  it('Only Hours', () => {
    expect(transformTiming(undefined, '0')).toEqual([]);
    expect(transformTiming(undefined, '10')).toEqual([
      {
        value: '10',
        units: TIMING_UNITS.HOURS,
      },
    ]);
    expect(transformTiming(undefined, '60')).toEqual([
      {
        value: '60',
        units: TIMING_UNITS.HOURS,
      },
    ]);
    expect(transformTiming(undefined, '90')).toEqual([
      {
        value: '90',
        units: TIMING_UNITS.HOURS,
      },
    ]);
    expect(transformTiming('0', '90')).toEqual([
      {
        value: '90',
        units: TIMING_UNITS.HOURS,
      },
    ]);
  });

  it('Mix of Hours and Minutes', () => {
    expect(transformTiming('0', '0')).toEqual([]);
    expect(transformTiming('20', '1')).toEqual([
      {
        value: '20',
        units: TIMING_UNITS.MINUTES,
      },
      {
        value: '1',
        units: TIMING_UNITS.HOURS,
      },
    ]);
    expect(transformTiming('70', '1')).toEqual([
      {
        value: '10',
        units: TIMING_UNITS.MINUTES,
      },
      {
        value: '2',
        units: TIMING_UNITS.HOURS,
      },
    ]);
  });
});
