import Pluralize from 'pluralize';
import {
  unitsOfMeasure,
  flattenedUnits,
  unitsMap,
  numbersRegex,
  rangeWordsRegex,
} from './ingredientComponents';

export const isNumeric = (num) => {
  // eslint-disable-next-line no-restricted-globals
  return !isNaN(parseFloat(num)) && isFinite(num);
};

export const isFraction = (str) => {
  if (typeof str !== 'string') {
    return false;
  }
  const matches = str.match(/^(\d+\s\d+\/\d+|\d+\/\d+)$/);
  if (matches) {
    return true;
  }
  return false;
};

export const isNumber = (str) => {
  return isNumeric(str) || isFraction(str);
};

export const properCase = (str) => {
  if (!str || typeof str !== 'string') {
    return str;
  }
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const isUnitOfMeasure = (value) => {
  if (!value || typeof value !== 'string') {
    return false;
  }
  const val = Pluralize.singular(value);
  if (
    unitsOfMeasure[val.toLowerCase()] ||
    unitsOfMeasure[value.toLowerCase()] ||
    flattenedUnits.indexOf(val) > -1 ||
    flattenedUnits.indexOf(value) > -1
  ) {
    return true;
  }
  return false;
};

export const unitNormalizer = (unit) => {
  let val = Pluralize.singular(unit);
  val = properCase(
    unitsMap[unit] ||
      unitsMap[val] ||
      unitsMap[unit.toLowerCase()] ||
      unitsMap[val.toLowerCase()] ||
      val
  );
  return val;
};

export const getNumber = (fullText) => {
  const numbersText = fullText.match(numbersRegex);
  if (numbersText) {
    const numberMatch = numbersText[0];
    return {
      match: numberMatch.trim(),
      rest: fullText.substr(numberMatch.length).trim().split(' '),
    };
  }
  return undefined;
};

export const getRangedAmount = (fullText) => {
  const rangeText = fullText.match(rangeWordsRegex);
  if (rangeText) {
    const rangeMatch = rangeText[0];
    const firstNumber = rangeText[1];
    const secondNumber = rangeText[3];
    return {
      match: {
        min: firstNumber.trim(),
        max: secondNumber.trim(),
      },
      rest: fullText.substr(rangeMatch.length).trim().split(' '),
    };
  }
  return undefined;
};

export const getAmount = (ingredientText) => {
  const rangedAmount = getRangedAmount(ingredientText);
  if (rangedAmount) {
    return rangedAmount;
  }
  return getNumber(ingredientText);
};
