// @ts-ignore
import RecipeData from '../recipeData/recipes.json';

const getRecipeObject = (id) => {
  const recipes = RecipeData.filter((recipe) => {
    // eslint-disable-next-line eqeqeq
    return recipe.id == id;
  });

  return recipes.length > 0 ? recipes[0] : undefined;
};

export default getRecipeObject;
