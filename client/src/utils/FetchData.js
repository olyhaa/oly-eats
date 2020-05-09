import gql from 'graphql-tag';
// @ts-ignore
import RecipeData from '../recipeData/recipes.json';

const getRecipeObject = (id) => {
  const recipes = RecipeData.filter((recipe) => {
    return recipe.id === id;
  });

  return recipes.length > 0 ? recipes[0] : undefined;
};

export const getCategoryListQuery = () => {
  return gql`
    query GetAllCategories {
      allTags(typeid: "1") {
        id
        typeid
        label
      }
    }
  `;
};

export const getCuisineListQuery = () => {
  return gql`
    query GetAllCuisines {
      allTags(typeid: "2") {
        id
        typeid
        label
      }
    }
  `;
};

export const getEquipmentListQuery = () => {
  return gql`
    query GetAllEquipment {
      allTags(typeid: "3") {
        id
        typeid
        label
      }
    }
  `;
};

export const getMealTypeListQuery = () => {
  return gql`
    query GetAllMealTypes {
      allTags(typeid: "4") {
        id
        typeid
        label
      }
    }
  `;
};

export default getRecipeObject;
