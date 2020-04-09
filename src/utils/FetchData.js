// @ts-ignore
import RecipeData from '../recipeData/recipes.json';
// @ts-ignore
import CategoryData from '../recipeData/category.json';
// @ts-ignore
import CuisineData from '../recipeData/cuisine.json';
// @ts-ignore
import EquipmentData from '../recipeData/equipment.json';
// @ts-ignore
import MealTypsData from '../recipeData/mealTypes.json';

const getRecipeObject = (id) => {
  const recipes = RecipeData.filter((recipe) => {
    // eslint-disable-next-line eqeqeq
    return recipe.id == id;
  });

  return recipes.length > 0 ? recipes[0] : undefined;
};

export const getCategoryList = () => {
  return CategoryData;
};

export const getCuisineList = () => {
  return CuisineData;
};

export const getEquipmentList = () => {
  return EquipmentData;
};

export const getMealTypeList = () => {
  return MealTypsData;
};

export default getRecipeObject;
