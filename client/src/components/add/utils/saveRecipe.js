import { FIELDS } from '../constants/formConstants';
import { TIMING_UNITS, RECIPE } from '../../../utils/recipeConstants';
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
      const normalizedText = convertUnicodeFractions(item).trim();
      const step = {};
      step[RECIPE.DIRECTIONS_SECTION_TEXT] = normalizedText;
      return step;
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
    const time = {};
    time[RECIPE.TIMING_VALUE] = mins;
    time[RECIPE.TIMING_UNIT] = TIMING_UNITS.MINUTE;
    timing.push(time);
  }
  if (hrs > 0) {
    const time = {};
    time[RECIPE.TIMING_VALUE] = hrs;
    time[RECIPE.TIMING_UNIT] = TIMING_UNITS.HOUR;
    timing.push(time);
  }
  return timing;
};

export const saveRecipe = (values) => {
  const recipe = {};
  if (values[RECIPE.ID]) {
    recipe[RECIPE.ID] = values[RECIPE.ID];
  }
  recipe[RECIPE.TITLE] = values[FIELDS.TITLE];
  recipe[RECIPE.DESCRIPTION] = values[FIELDS.DESCRIPTION];
  recipe[RECIPE.SOURCE] = {};
  recipe[RECIPE.SOURCE][RECIPE.SOURCE_DISPLAY] = values[FIELDS.SOURCE_DISPLAY];
  recipe[RECIPE.SOURCE][RECIPE.SOURCE_URL] = values[FIELDS.SOURCE_URL];
  recipe[RECIPE.PHOTO] = values[FIELDS.PHOTO_URL];
  recipe[RECIPE.SERVINGS] = values[FIELDS.SERVINGS];

  recipe[RECIPE.INGREDIENT_SECTION] = [];
  for (let i = 0; i < values[FIELDS.INGREDIENTS].length; i++) {
    const section = {};
    section[RECIPE.INGREDIENT_SECTION_LABEL] =
      values[FIELDS.INGREDIENTS][i][FIELDS.INGREDIENTS_LABEL];
    section[RECIPE.INGREDIENT_SECTION_INGREDIENTS] = parseIngredientList(
      values[FIELDS.INGREDIENTS][i][FIELDS.INGREDIENTS_LIST]
    );
    recipe[RECIPE.INGREDIENT_SECTION].push(section);
  }

  recipe[RECIPE.DIRECTIONS_SECTION] = [];
  for (let i = 0; i < values[FIELDS.DIRECTIONS].length; i++) {
    const section = {};
    section[RECIPE.DIRECTIONS_SECTION_LABEL] =
      values[FIELDS.DIRECTIONS][i][FIELDS.DIRECTIONS_LABEL];
    section[RECIPE.DIRECTIONS_SECTION_STEPS] = parseDirectionsList(
      values[FIELDS.DIRECTIONS][i][FIELDS.DIRECTIONS_LIST]
    );
    recipe[RECIPE.DIRECTIONS_SECTION].push(section);
  }

  recipe[RECIPE.TIMING] = {};
  recipe[RECIPE.TIMING][RECIPE.TIMING_PREP] = parseTiming(
    values[FIELDS.TIMING_PREP_VALUE_MINS],
    values[FIELDS.TIMING_PREP_VALUE_HOURS]
  );
  recipe[RECIPE.TIMING][RECIPE.TIMING_TOTAL] = parseTiming(
    values[FIELDS.TIMING_TOTAL_VALUE_MINS],
    values[FIELDS.TIMING_TOTAL_VALUE_HOURS]
  );

  /*
  recipe[RECIPE.TAGS] = {};
  recipe[RECIPE.TAGS][RECIPE.TAGS_MEAL] = values[FIELDS.MEAL_TYPE];
  recipe[RECIPE.TAGS][RECIPE.TAGS_EQUIPMENT] = values[FIELDS.EQUIPMENT];
  recipe[RECIPE.TAGS][RECIPE.TAGS_CATEGORY] = values[FIELDS.CATEGORY];
  recipe[RECIPE.TAGS][RECIPE.TAGS_CUISINE] = values[FIELDS.CUISINE];
*/
  return recipe;
};
