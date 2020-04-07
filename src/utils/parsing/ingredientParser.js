/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-cond-assign */
// @ts-nocheck
/*
 * SCHEMA
 * <amount> <unit> [of] (<prep>) <ingredient> optional|(optional) (<prep>), prep
 *
 * Reference http://stackoverflow.com/questions/12413705/parsing-natural-language-ingredient-quantities-for-recipes
 */
import {
  getAmount,
  getUnit,
  getPrep,
  getByWeight,
  getOptional,
  getToTaste,
  removeNoise,
  addStrWithSpace,
} from './ingredientComponentsHelper';

export const parseIngredient = (source) => {
  const ingredient = {};

  // split into words
  let words = source.split(/[ \t]/);

  let tmpAmount;

  // if starts with "a", have implicit amount of 1
  if (words[0].toLowerCase() === 'a' || words[0].toLowerCase() === 'an') {
    tmpAmount = 1;
    words.shift();
  }

  // get any numbers that are at the beginning of the string
  const amount = getAmount(words);
  if (!tmpAmount && amount.match) {
    ingredient.amount = amount.match;
  }
  words = amount.rest;

  // next, get the units
  const unit = getUnit(words);
  if (unit.match) {
    ingredient.unit = unit.match;
  }
  words = unit.rest;

  // check for modifiers
  const byWeight = getByWeight(words);
  if (byWeight.match) {
    ingredient.byWeight = byWeight.match.length > 0;
  }
  words = byWeight.rest;

  const optional = getOptional(words);
  if (optional.match) {
    ingredient.optional = optional.match.length > 0;
  }
  words = optional.rest;

  const toTaste = getToTaste(words);
  if (toTaste.match) {
    ingredient.toTaste = toTaste.match.length > 0;
  }
  words = toTaste.rest;

  // get any prep modifiers
  const prep = getPrep(words);
  if (prep.match) {
    ingredient.prep = prep.match.join(' ');
  }
  words = prep.rest;

  // clean up remaining text for ingredient name
  words = removeNoise(words);
  ingredient.name = words.join(' ');

  if (tmpAmount && ingredient.unit !== 'Little') {
    ingredient.amount = `${tmpAmount}`;
  }
  return ingredient;
};

export const buildIngredientString = ({
  amount = undefined,
  unit = undefined,
  name,
  prep = undefined,
  optional = undefined,
  toTaste = undefined,
}) => {
  let ingredientStr = '';
  if (amount?.min && amount?.max) {
    ingredientStr = addStrWithSpace(
      ingredientStr,
      `${amount.min} - ${amount.max}`
    );
  }
  if (typeof amount === 'string') {
    ingredientStr = addStrWithSpace(ingredientStr, amount);
  }
  ingredientStr = addStrWithSpace(ingredientStr, unit);
  ingredientStr = addStrWithSpace(ingredientStr, name);
  ingredientStr = addStrWithSpace(ingredientStr, prep, true);
  ingredientStr = addStrWithSpace(
    ingredientStr,
    optional ? 'optional' : '',
    true
  );
  ingredientStr = addStrWithSpace(
    ingredientStr,
    toTaste ? 'to taste' : '',
    true
  );
  return ingredientStr;
};
