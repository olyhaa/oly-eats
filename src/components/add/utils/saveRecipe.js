import { saveAs } from 'file-saver';
import uuid from 'uuid/v4';
import { FIELDS } from '../constants/formConstants';
import { TIMING_UNITS } from '../../../utils/recipeConstants';
import { parseIngredient } from '../../../utils/ingredientParsing/ingredientParser';
import { convertUnicodeFractions } from '../../../utils/formatters';

const parseDirectionsList = (directions) => {
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
    .map((item) => {
      return { text: convertUnicodeFractions(item).trim() };
    });

  return directionsList;
};

const parseIngredientList = (ingredients) => {
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

export const parseTiming = (minutes = '0', hours = '0') => {
  const timing = [];
  let mins = Number(minutes);
  let hrs = Number(hours);
  while (mins >= 60) {
    mins -= 60;
    hrs += 1;
  }
  if (mins > 0) {
    timing.push({ value: mins.toString(), units: TIMING_UNITS.MINUTE });
  }
  if (hrs > 0) {
    timing.push({ value: hrs.toString(), units: TIMING_UNITS.HOUR });
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
  for (let i = 0; i < values[FIELDS.INGREDIENTS].length; i++) {
    recipe.ingredientSection.push({
      label: values[FIELDS.INGREDIENTS][i][FIELDS.INGREDIENTS_LABEL],
      ingredients: parseIngredientList(
        values[FIELDS.INGREDIENTS][i][FIELDS.INGREDIENTS_LIST]
      ),
    });
  }

  recipe.directionsSection = [];
  for (let i = 0; i < values[FIELDS.DIRECTIONS].length; i++) {
    recipe.directionsSection.push({
      label: values[FIELDS.DIRECTIONS][i][FIELDS.DIRECTIONS_LABEL],
      steps: parseDirectionsList(
        values[FIELDS.DIRECTIONS][i][FIELDS.DIRECTIONS_LIST]
      ),
    });
  }

  recipe.timing = {
    prep: parseTiming(
      values[FIELDS.TIMING_PREP_VALUE_MINS],
      values[FIELDS.TIMING_PREP_VALUE_HOURS]
    ),
    total: parseTiming(
      values[FIELDS.TIMING_TOTAL_VALUE_MINS],
      values[FIELDS.TIMING_TOTAL_VALUE_HOURS]
    ),
  };

  recipe.tags = {};
  recipe.tags.meal = values[FIELDS.MEAL_TYPE];
  recipe.tags.equipment = values[FIELDS.EQUIPMENT];
  recipe.tags.category = values[FIELDS.CATEGORY];
  recipe.tags.cuisine = values[FIELDS.CUISINE];

  recipe.dateAdded = Date.now();

  const blob = new Blob([JSON.stringify(recipe)], { type: 'application/json' });
  saveAs(blob, 'recipe.json');
};