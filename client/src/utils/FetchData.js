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
      allCategories {
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
      allCuisines {
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
      allEquipment {
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
      allMealTypes {
        id
        typeid
        label
      }
    }
  `;
};

export default getRecipeObject;
