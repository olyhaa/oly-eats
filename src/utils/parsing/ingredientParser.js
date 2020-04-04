/*
 * SCHEMA
 * <amount> <unit> [of] (<prep>) <ingredient> optional|(optional) (<prep>)
 *
 * Reference http://stackoverflow.com/questions/12413705/parsing-natural-language-ingredient-quantities-for-recipes
 */
import {
  noiseWords,
  fluidicWords,
  regexOptional,
} from './ingredientComponents';
import {
  isUnitOfMeasure,
  unitNormalizer,
  getRangedAmount,
} from './ingredientComponentsHelper';

export const isNumber = (str) => {
  if (typeof str !== 'string') {
    return false;
  }
  return str.match(/^(\d+\W\d+\/\d+|\d+\/\d+|\d+\.\d+|\d+)/);
};

/*
const getNumber = from => {
  const part = from.shift();
  if (part) {
    if (isNumeric(part) || isFraction(part)) {
      return (part + ' ' + getNumber(from)).trim();
    }
    from.unshift(part);
  }
  return '';
};
*/
export const getAmount = (wordsList) => {
  let ingredientText = wordsList.join(' ');
  const start = isNumber(ingredientText);
  if (start) {
    ingredientText = ingredientText.substr(start[0].length);
    const rangedMatch = getRangedAmount(ingredientText, start);
    if (rangedMatch) {
      return rangedMatch;
    }
    return {
      match: start[1],
      rest: ingredientText.trim().split(' '),
    };
  }
  return false;
};

export const checkForMatch = (len, section, within, offset) => {
  if (within.length - offset < len) {
    return false;
  }
  const seg = within
    .slice(offset, offset + len)
    .join(' ')
    .toLowerCase();
  if (seg === section) {
    return offset;
  }
  return checkForMatch(len, section, within, offset + 1);
};

export const findMatch = (args) => {
  const matchList = args.lookFor,
    matchIdx = checkForMatch(
      matchList.length,
      matchList.join(' '),
      args.within,
      0
    );
  if (matchIdx !== false) {
    args.within.splice(matchIdx, matchList.length);
  }
  return matchIdx;
};

export const getALittle = (from) => {
  const idx = findMatch({
    lookFor: ['a', 'little'],
    within: from,
  });
  return idx === false ? false : true;
};

export const getByWeight = (from) => {
  const idx = findMatch({
    lookFor: ['by', 'weight'],
    within: from,
  });
  return idx === false ? false : true;
};

export const getFluidic = (from) => {
  const val = from[0].toLowerCase().replace(/\./g, '');
  if (fluidicWords.indexOf(val) > -1) {
    from.shift();
    return true;
  }
  return false;
};

export const getUnit = (from) => {
  if (getALittle(from)) {
    return 'a little';
  }
  if (isUnitOfMeasure(from[0] || '')) {
    return unitNormalizer(from.shift());
  }
  return false;
};

export const getOptional = (from) => {
  let res = false;
  from.filter((val, idx) => {
    if (regexOptional.test(val)) {
      res = true;
      from.splice(idx, 1);
    }
  });
  return res;
};

export const getToTaste = (from) => {
  const idx = findMatch({
    lookFor: ['to', 'taste'],
    within: from,
  });
  return idx === false ? false : true;
};

export const removeCommas = (from) => {
  return from.replace(/,\s*$/, '');
};

export const removeNoise = (from) => {
  return from
    .filter((val, idx) => {
      if (noiseWords.indexOf(val.toLowerCase()) < 0) {
        return val;
      }
    })
    .map((val) => {
      return removeCommas(val);
    });
};

export const getPrep = (from) => {
  // TODO parse commas as prep
  let startIndex = false;
  let endIndex;
  let inPrep = false;
  let prep = from.forEach((item, idx) => {
    if (!inPrep && startIndex === false && item[0] === '(') {
      inPrep = true;
      startIndex = idx;
    }
    if (inPrep && item.substr(-1) === ')') {
      inPrep = false;
      endIndex = idx;
    }
  });
  if (startIndex !== false) {
    prep = from.splice(startIndex, endIndex + 1).join(' ');
    return prep.substr(-1) === ')'
      ? prep.substring(1, prep.length - 1)
      : prep.substr(1);
  }
  return false;
};

export const parseIngredient = (source) => {
  const ingredient = {};

  // split into words
  let words = source.split(/[ \t]/);
  // split by comma
  let sections = source.split(',');

  let val;
  let tmpAmount;

  // if starts with "a", have implicit amount of 1
  if (words[0] === 'a') {
    tmpAmount = 1;
    words.shift();
  }
  if (!tmpAmount && (val = getAmount(words))) {
    ingredient.amount = val.match;
    words = val.rest;
  }
  if (getFluidic(words)) {
    ingredient.fluidic = true;
  }
  if ((val = getUnit(words))) {
    ingredient.unit = val;
  }
  if (getByWeight(words)) {
    ingredient.byWeight = true;
  }
  if (getOptional(words)) {
    ingredient.optional = true;
  }
  if (getToTaste(words)) {
    ingredient.toTaste = true;
  }
  if ((val = getPrep(words))) {
    ingredient.prep = val;
  }
  words = removeNoise(words);
  ingredient.name = words.join(' ');

  if (tmpAmount) {
    if (ingredient.unit !== 'Little') {
      ingredient.amount = tmpAmount + '';
    }
  }
  return ingredient;
};
