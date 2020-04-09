import { saveAs } from 'file-saver';
import uuid from 'uuid/v4';
import { FIELDS, TIMING_UNITS } from './constants';
import { parseIngredient } from '../../utils/parsing/ingredientParser';
import { convertUnicodeFractions } from '../../utils/parsing/general';

const transformDirections = (directions) => {
  // break on new lines
  const list = directions.split('\n');

  // clean up extra spaces
  const directionsList = list
    .map((item) => {
      return item.trim();
    })
    // remove empty items
    .filter((item) => {
      return item.length > 0;
    })
    .map((item, index) => {
      return { id: index, text: convertUnicodeFractions(item).trim() };
    });

  return directionsList;
};

const transformIngredients = (ingredients) => {
  // break on new lines
  const list = ingredients.split('\n');

  // clean up extra spaces
  const ingredientsList = list
    .map((item) => {
      return convertUnicodeFractions(item).trim();
    })
    // remove empty items
    .filter((item) => {
      return item.length > 0;
    })
    .map((ingredientStr) => {
      const newItem = parseIngredient(ingredientStr);
      return newItem;
    });

  return ingredientsList;
};

const transformTiming = (minutes, hours) => {
  const timing = [];
  if (minutes > 0) {
    timing.push({ value: minutes, units: TIMING_UNITS.MINUTES });
  }
  if (hours > 0) {
    timing.push({ value: minutes, units: TIMING_UNITS.MINUTES });
  }
  return timing;
};

export const saveRecipe = (values) => {
  const recipe = {};
  recipe.id = uuid();
  recipe.title = values[FIELDS.TITLE];
  recipe.description = values[FIELDS.DESCRIPTION];
  recipe.source = {
    display: values[FIELDS.SOURCE_DISPLAY],
    url: values[FIELDS.SOURCE_URL],
  };
  recipe.photo = values[FIELDS.PHOTO_URL];
  recipe.servings = values[FIELDS.SERVINGS];

  recipe.ingredientSection = [];
  recipe.ingredientSection.push({
    ingredients: transformIngredients(values[FIELDS.INGREDIENTS_LIST]),
  });

  recipe.directionsSection = [];
  recipe.directionsSection.push({
    steps: transformDirections(values[FIELDS.DIRECTIONS_LIST]),
  });

  recipe.timing = {
    prep: transformTiming(
      values[FIELDS.TIMING_PREP_VALUE_MINS],
      values[FIELDS.TIMING_PREP_VALUE_HOURS]
    ),
    total: transformTiming(
      values[FIELDS.TIMING_TOTAL_VALUE_MINS],
      values[FIELDS.TIMING_TOTAL_VALUE_HOURS]
    ),
  };

  const blob = new Blob([JSON.stringify(recipe)], { type: 'application/json' });
  saveAs(blob, 'recipe.json');
};
