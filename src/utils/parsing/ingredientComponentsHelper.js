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

export const getNumber = (words) => {
  const fullText = words.join(' ');
  const numbersText = fullText.match(numbersRegex);
  if (numbersText) {
    const numberMatch = numbersText[0];
    return {
      match: numberMatch.trim(),
      rest: fullText.substr(numberMatch.length).trim().split(' '),
    };
  }
  return { rest: words };
};

export const getRangedAmount = (words) => {
  const fullText = words.join(' ');
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
  return { rest: words };
};

export const getAmount = (words) => {
  const rangedAmount = getRangedAmount(words);
  if (rangedAmount.match) {
    return rangedAmount;
  }
  return getNumber(words);
};

export const checkForMatch = (itemsToFind, searchList, startIndex) => {
  if (!itemsToFind) {
    return -1;
  }
  const numItems = itemsToFind.length;
  const combinedItems = itemsToFind.join(' ').toLowerCase();
  if (searchList.length - startIndex < numItems) {
    return -1;
  }
  const seg = searchList
    .slice(startIndex, startIndex + numItems)
    .join(' ')
    .toLowerCase();
  if (seg === combinedItems) {
    return startIndex;
  }
  return checkForMatch(itemsToFind, searchList, startIndex + 1);
};

export const findMatch = (wordsToFind, wordsList) => {
  const matchIdx = checkForMatch(wordsToFind, wordsList, 0);
  if (matchIdx >= 0) {
    return {
      match: wordsToFind,
      rest: wordsList.slice(matchIdx + wordsToFind.length),
    };
  }
  return { rest: wordsList };
};

export const getUnit = (words) => {
  const isUnit = isUnitOfMeasure(words[0]);
  if (isUnit) {
    return { match: unitNormalizer(words[0]), rest: words.slice(1) };
  }
  return { rest: words };
};
