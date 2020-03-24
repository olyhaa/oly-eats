import RecipeData from "../recipeData/recipes";

const getRecipeObject = id => {
  const recipes = RecipeData.filter(recipe => {
    return recipe.id == id;
  });

  return recipes.length > 0 ? recipes[0] : undefined;
};

export default getRecipeObject;
