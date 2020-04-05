/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-cond-assign */
// @ts-nocheck
/*
 * SCHEMA
 * <amount> <unit> [of] (<prep>) <ingredient> optional|(optional) (<prep>)
 *
 * Reference http://stackoverflow.com/questions/12413705/parsing-natural-language-ingredient-quantities-for-recipes
 */
import { noiseWords, regexOptional } from './ingredientComponents';
import { getAmount, getUnit, findMatch } from './ingredientComponentsHelper';

export const getByWeight = (from) => {
  return findMatch({
    lookFor: ['by', 'weight'],
    within: from,
  });
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
  return findMatch({
    lookFor: ['to', 'taste'],
    within: from,
  });
};

export const removeCommas = (from) => {
  return from.replace(/,\s*$/, '');
};

export const removeNoise = (from) => {
  return from
    .filter((val) => {
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

  let val;
  let tmpAmount;

  // if starts with "a", have implicit amount of 1
  if (words[0] === 'a') {
    tmpAmount = 1;
    words.shift();
  }

  // get any numbers that are at the beginning of the string
  const amount = getAmount(words);
  if (!tmpAmount && amount) {
    ingredient.amount = amount.match;
    words = amount.rest;
  }

  // next, get the units
  const unit = getUnit(words);
  if (unit) {
    ingredient.unit = unit.match;
    words = unit.rest;
  }

  const byWeight = getByWeight(words);
  if (byWeight) {
    ingredient.byWeight = byWeight.match.length > 0;
    words = byWeight.rest;
  }

  const optional = getOptional(words);
  if (optional) {
    ingredient.optional = optional.match.length > 0;
    words = optional.rest;
  }

  const toTaste = getToTaste(words);
  if (getToTaste(words)) {
    ingredient.toTaste = toTaste.match.length > 0;
    words = toTaste.rest;
  }

  if ((val = getPrep(words))) {
    ingredient.prep = val;
  }
  words = removeNoise(words);
  ingredient.name = words.join(' ');

  if (tmpAmount) {
    if (ingredient.unit !== 'Little') {
      ingredient.amount = `${tmpAmount}`;
    }
  }
  return ingredient;
};
