import { RECIPE, TIMING_UNITS } from 'utils/recipeConstants';
import { buildIngredientString } from 'utils/ingredientParsing/ingredientParser';
import { FIELDS } from '../constants/formConstants';

const decodeIngredients = (ingredients) => {
  const formIngredients = [];

  for (let i = 0; i < ingredients.length; i++) {
    const section = ingredients[i];
    const formSection = {};

    formSection[FIELDS.INGREDIENTS_LABEL] =
      section[RECIPE.INGREDIENT_SECTION_LABEL];

    let combinedIngredients = '';
    const numIngred = section[RECIPE.INGREDIENT_SECTION_INGREDIENTS].length;
    for (let ingredient = 0; ingredient < numIngred; ingredient++) {
      combinedIngredients += `${buildIngredientString(
        section[RECIPE.INGREDIENT_SECTION_INGREDIENTS][ingredient]
      )}\n`;
    }
    formSection[FIELDS.INGREDIENTS_LIST] = combinedIngredients;
    formIngredients.push(formSection);
  }
  return formIngredients;
};

const decodeDirections = (directions) => {
  const formDirections = [];
  for (let i = 0; i < directions.length; i++) {
    const section = directions[i];
    const formSection = {};

    formSection[FIELDS.DIRECTIONS_LABEL] =
      section[RECIPE.DIRECTIONS_SECTION_LABEL];

    let combinedSteps = '';
    const numSteps = section[RECIPE.DIRECTIONS_SECTION_STEPS].length;
    for (let step = 0; step < numSteps; step++) {
      combinedSteps += `${
        section[RECIPE.DIRECTIONS_SECTION_STEPS][step][
          RECIPE.DIRECTIONS_SECTION_TEXT
        ]
      }\n\n`;
    }
    formSection[FIELDS.DIRECTIONS_LIST] = combinedSteps;
    formDirections.push(formSection);
  }
  return formDirections;
};

const decodeTiming = (timingList, unit) => {
  if (timingList) {
    for (let i = 0; i < timingList.length; i++) {
      if (timingList[i][RECIPE.TIMING_UNIT] === unit) {
        return timingList[i][RECIPE.TIMING_VALUE];
      }
    }
  }
  return undefined;
};

export const decodeRecipe = (recipe) => {
  const formRecipe = {};
  // basic info
  formRecipe[FIELDS.ID] = recipe[RECIPE.ID];
  formRecipe[FIELDS.TITLE] = recipe[RECIPE.TITLE];
  formRecipe[FIELDS.DESCRIPTION] = recipe[RECIPE.DESCRIPTION];
  formRecipe[FIELDS.PHOTO_URL] = recipe[RECIPE.PHOTO];

  // source info
  formRecipe[FIELDS.SOURCE_DISPLAY] =
    recipe[RECIPE.SOURCE][RECIPE.SOURCE_DISPLAY];
  formRecipe[FIELDS.SOURCE_URL] = recipe[RECIPE.SOURCE][RECIPE.SOURCE_URL];

  // ingredients
  formRecipe[FIELDS.INGREDIENTS] = decodeIngredients(
    recipe[RECIPE.INGREDIENT_SECTION]
  );

  // directions
  formRecipe[FIELDS.DIRECTIONS] = decodeDirections(
    recipe[RECIPE.DIRECTIONS_SECTION]
  );

  // servings
  formRecipe[FIELDS.SERVINGS] = recipe[RECIPE.SERVINGS];

  // timings
  formRecipe[FIELDS.TIMING_PREP_VALUE_HOURS] = decodeTiming(
    recipe[RECIPE.TIMING][RECIPE.TIMING_PREP],
    TIMING_UNITS.HOUR
  );
  formRecipe[FIELDS.TIMING_PREP_VALUE_MINS] = decodeTiming(
    recipe[RECIPE.TIMING][RECIPE.TIMING_PREP],
    TIMING_UNITS.MINUTE
  );
  formRecipe[FIELDS.TIMING_TOTAL_VALUE_HOURS] = decodeTiming(
    recipe[RECIPE.TIMING][RECIPE.TIMING_TOTAL],
    TIMING_UNITS.HOUR
  );
  formRecipe[FIELDS.TIMING_TOTAL_VALUE_MINS] = decodeTiming(
    recipe[RECIPE.TIMING][RECIPE.TIMING_TOTAL],
    TIMING_UNITS.MINUTE
  );

  // tags
  const tagsMap = {};
  for (let i = 0; i < recipe[RECIPE.TAGS].length; i++) {
    const tag = recipe[RECIPE.TAGS][i];
    if (!tagsMap[tag.type.id]) {
      tagsMap[tag.type.id] = [];
    }
    tagsMap[tag.type.id].push(tag.id);
  }
  Object.keys(tagsMap).forEach((key) => {
    formRecipe[`${FIELDS.TAGS}_${key}`] = tagsMap[key];
  });
  return formRecipe;
};
