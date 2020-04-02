import { FIELDS } from './constants';

export const saveRecipe = values => {
  let recipe = {};
  recipe.title = values[FIELDS.TITLE];
  recipe.description = values[FIELDS.DESCRIPTION];
  recipe.source = {
    display: values[FIELDS.SOURCE_DISPLAY],
    url: values[FIELDS.SOURCE_URL]
  };
  recipe.photo = values[FIELDS.PHOTO_URL];
  recipe.servings = values[FIELDS.SERVINGS];

  window.alert(
    'VALUES = ' +
      JSON.stringify(values) +
      '\nRECIPE OBJECT = ' +
      JSON.stringify(recipe)
  );
};
