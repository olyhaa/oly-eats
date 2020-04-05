import Pluralize from 'pluralize';
import {
  unitsOfMeasure,
  flattenedUnits,
  unitsMap,
  rangeWordsRegex,
} from './ingredientComponents';

export const isNumeric = (num) => {
  return !Number.isNaN(parseFloat(num)) && Number.isFinite(num);
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

export const getRangedAmount = (fullText, start) => {
  const rangeText = fullText.match(rangeWordsRegex);
  let ingredientText = fullText;
  if (rangeText) {
    if (!rangeText[2]) {
      ingredientText = ingredientText.substr(rangeText[0].length);
    }
    if (rangeText[2] && isNumeric(rangeText[2])) {
      ingredientText = ingredientText
        .substr(rangeText[0].length - rangeText[2].length)
        .replace(/^ */, '');
    }
    const end = isNumber(ingredientText);
    if (end) {
      return {
        match: {
          min: start[1],
          max: end[1],
        },
        rest: ingredientText.substr(end[0].length).trim().split(' '),
      };
    }
  }
  return undefined;
};
