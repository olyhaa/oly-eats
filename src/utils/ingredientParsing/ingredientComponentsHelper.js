import Pluralize from 'pluralize';
import { RECIPE } from '../recipeConstants';
import {
  unitsOfMeasure,
  flattenedUnits,
  unitsMap,
  numbersRegex,
  rangeWordsRegex,
  parenRegex,
  noiseWords,
} from './ingredientConstants';

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

export const trimWord = (word) => {
  let trimmedWord = word.trim();
  trimmedWord = trimmedWord.replace(/\.+$/, '');
  trimmedWord = trimmedWord.replace(/^\.+/, '');
  return trimmedWord;
};

export const isUnitOfMeasure = (value) => {
  if (!value || typeof value !== 'string') {
    return false;
  }
  const trimmedVal = trimWord(value);
  const val = Pluralize.singular(trimmedVal);
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
  const trimmedVal = trimWord(unit);
  let val = Pluralize.singular(trimmedVal);
  val =
    unitsMap[unit] ||
    unitsMap[val] ||
    unitsMap[unit.toLowerCase()] ||
    unitsMap[val.toLowerCase()] ||
    val;
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
    const match = {};
    match[RECIPE.INGREDIENTS_AMOUNT_MIN] = firstNumber.trim();
    match[RECIPE.INGREDIENTS_AMOUNT_MAX] = secondNumber.trim();
    return {
      match,
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
  const possibleMatch = searchList
    .slice(startIndex, startIndex + numItems)
    .join(' ')
    .toLowerCase();
  if (possibleMatch.indexOf(combinedItems) >= 0) {
    return startIndex;
  }
  return checkForMatch(itemsToFind, searchList, startIndex + 1);
};

export const findMatch = (wordsToFind, wordsList) => {
  const matchIdx = checkForMatch(wordsToFind, wordsList, 0);
  if (matchIdx >= 0) {
    const newWords = wordsList
      .slice(0, matchIdx)
      .concat(wordsList.slice(matchIdx + wordsToFind.length));
    return {
      match: wordsToFind,
      rest: newWords,
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

export const getOptional = (words) => {
  return findMatch(['optional'], words);
};

export const getToTaste = (words) => {
  return findMatch(['to', 'taste'], words);
};

export const removeBeginningEndNoise = (str) => {
  let trimmedString = str.trim();
  // removes "and" from beginning or end of string
  if (trimmedString.toLowerCase().startsWith('and')) {
    trimmedString = trimmedString.substr('and'.length);
  }
  if (trimmedString.toLowerCase().endsWith('and')) {
    trimmedString = trimmedString.substr(
      0,
      trimmedString.length - 'and'.length
    );
  }
  return trimmedString.trim();
};

export const getParenText = (words) => {
  const fullText = words.join(' ');
  const parenText = fullText.match(parenRegex);

  if (parenText) {
    const fullMatch = parenText[0];
    const parenMatch = removeBeginningEndNoise(parenText[1]);
    const matchIndex = fullText.indexOf(fullMatch);
    const newWords = fullText
      .substr(0, matchIndex)
      .trim()
      .concat(fullText.substr(matchIndex + fullMatch.length));
    return {
      match: [parenMatch.trim()],
      rest: newWords.trim().split(' '),
    };
  }
  return { rest: words };
};

export const getCommaText = (words) => {
  const fullText = words.join(' ');
  const commaIndex = fullText.indexOf(',');
  if (commaIndex >= 0) {
    const commaText = removeBeginningEndNoise(fullText.substr(commaIndex + 1));
    const otherText = fullText.substr(0, commaIndex);
    return {
      match: [commaText.trim()],
      rest: otherText.trim().split(' '),
    };
  }
  return { rest: words };
};

export const getEmDashText = (words) => {
  const fullText = words.join(' ');
  const emdashIndex = fullText.indexOf('—');
  if (emdashIndex >= 0) {
    const emdashText = removeBeginningEndNoise(
      fullText.substr(emdashIndex + 1)
    );
    const otherText = fullText.substr(0, emdashIndex);
    return {
      match: [emdashText.trim()],
      rest: otherText.trim().split(' '),
    };
  }
  return { rest: words };
};

export const getPrep = (words) => {
  let matchPrep = '';
  let wordsList = words;

  // anything inside parenthesis should be considered prep
  const parens = getParenText(wordsList);
  if (parens.match) {
    if (parens.match[0].length > 0) {
      if (matchPrep.length > 0) {
        matchPrep += ', ';
      }
      matchPrep += parens.match[0];
    }
    wordsList = parens.rest;
  }

  // anything after the first comma should be considered prep
  const commas = getCommaText(wordsList);
  if (commas.match) {
    if (commas.match[0].length > 0) {
      if (matchPrep.length > 0) {
        matchPrep += ', ';
      }
      matchPrep += commas.match[0];
    }
    wordsList = commas.rest;
  }

  // anything after the first em-dash should be considered prep
  const emdash = getEmDashText(wordsList);
  if (emdash.match) {
    if (emdash.match[0].length > 0) {
      if (matchPrep.length > 0) {
        matchPrep += ', ';
      }
      matchPrep += emdash.match[0];
    }
    wordsList = emdash.rest;
  }

  if (matchPrep) {
    return {
      match: [matchPrep],
      rest: wordsList,
    };
  }
  return { rest: wordsList };
};

export const removeNoise = (words) => {
  return (
    words
      // remove ending commas
      .map((word) => {
        return word.replace(/,\s*$/, '');
      })
      // remove noise words
      .filter((word) => {
        if (noiseWords.indexOf(word.toLowerCase()) < 0) {
          return word;
        }
        return false;
      })
  );
};
