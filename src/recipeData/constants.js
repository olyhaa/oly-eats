const TEASPOON = 'teaspoon';
const TEASPOON_SHORT = 't';
const TABLESPOON = 'tablespoon';
const TABLESPOON_SHORT = 'T';
const CUP = 'cup';
const CUP_SHORT = 'c';
const OUNCE = 'ounce';
const OUNCE_SHORT = 'oz';
const POUND = 'pound';
const POUND_SHORT = 'lb';

const UNITS_EXACT = [
  TEASPOON_SHORT,
  TABLESPOON_SHORT,
  CUP_SHORT,
  OUNCE_SHORT,
  POUND_SHORT
];

const UNITS_MATCH = [TEASPOON, TABLESPOON, CUP, OUNCE, POUND];

export const isUnit = value => {
  let matches;
  // check if it's shorthand (must match exactly)
  matches = UNITS_EXACT.filter(unit => {
    return unit === value;
  });
  if (matches.length > 0) {
    return true;
  }

  // check if it's longhand
  matches = UNITS_MATCH.filter(unit => {
    return value.toUpperCase().includes(unit.toUpperCase());
  });
  if (matches.length > 0) {
    return true;
  }
  return false;
};
