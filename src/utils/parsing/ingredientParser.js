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
import { noiseWords } from './ingredientComponents';
import { getAmount, getUnit, getPrep } from './ingredientComponentsHelper';

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

export const parseIngredient = (source) => {
  const ingredient = {};

  // split into words
  let words = source.split(/[ \t]/);

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

  // check for modifiers
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
  if (toTaste) {
    ingredient.toTaste = toTaste.match.length > 0;
    words = toTaste.rest;
  }

  // get any prep modifiers
  const prep = getPrep(words);
  if (prep) {
    ingredient.prep = prep.match;
    words = prep.rest;
  }

  // clearn up remaining text for ingredient name
  words = removeNoise(words);
  ingredient.name = words.join(' ');

  if (tmpAmount) {
    if (ingredient.unit !== 'Little') {
      ingredient.amount = `${tmpAmount}`;
    }
  }
  return ingredient;
};
