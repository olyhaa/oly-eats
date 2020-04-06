import { saveAs } from 'file-saver';
import uuid from 'uuid/v4';
import { FIELDS } from './constants';
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

  const blob = new Blob([JSON.stringify(recipe)], { type: 'application/json' });
  saveAs(blob, 'recipe.json');
};
