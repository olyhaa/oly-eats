import { FIELDS } from './constants';
import { parseIngredient } from '../../utils/parsing/ingredientParser';

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
    });

  return directionsList;
};

const transformIngredients = (ingredients) => {
  // break on new lines
  const list = ingredients.split('\n');

  // clean up extra spaces
  const ingredientsList = list
    .map((item) => {
      return item.trim();
    })
    // remove empty items
    .filter((item) => {
      return item.length > 0;
    })
    .map((ingredientStr) => {
      const newItem = parseIngredient(ingredientStr);
      /*
      // "notes" is everything after the comma
      const parsed = ingredientStr.split(',');
      if (parsed.length > 1) {
        newItem.notes = parsed[1];
      }

      // split remaining items on spaces
      const ingredientParts = parsed[0].split(' ');

      // check if first is a number
      let i = 0;
      if (isNumber(ingredientParts[i])) {
        newItem.value = ingredientParts[i++];
      }

      // check if second is a unit
      if (i < ingredientParts.length && isUnit(ingredientParts[i])) {
        newItem.units = ingredientParts[i++];
      }

      let descriptionStr = '';
      while (i < ingredientParts.length) {
        descriptionStr += ingredientParts[i++] + ' ';
      }
      newItem.desciption = descriptionStr;
*/
      return newItem;
    });

  return ingredientsList;
};

export const saveRecipe = (values) => {
  const recipe = {};
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

  // eslint-disable-next-line no-alert
  window.alert(`RECIPE OBJECT = ${JSON.stringify(recipe)}`);
};
