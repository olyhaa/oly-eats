import gql from 'graphql-tag';
// @ts-ignore
import RecipeData from '../recipeData/recipes.json';

export const getRecipeObject = (id) => {
  const recipes = RecipeData.filter((recipe) => {
    return recipe.id === id;
  });
  return recipes.length > 0 ? recipes[0] : undefined;
};

export const getAllRecipesQuery = () => {
  return gql`
    query GetAllRecipes {
      recipes {
        id
        title
        description
        source {
          display
          url
        }
        photo
        servings
        directions {
          label
          steps {
            text
          }
        }
        ingredients {
          label
          ingredients {
            rangedAmount {
              min
              max
            }
            amount
            unit
            prep
            name
            toTaste
            optional
          }
        }
        timing {
          prep {
            value
            units
          }
          total {
            value
            units
          }
        }
        tags {
          id
          typeid
          label
        }
        dateAdded
        dateUpdated
      }
    }
  `;
};

export const getRecipeQuery = () => {
  return gql`
    query GetRecipe($id: ID!) {
      recipe(id: $id) {
        id
        title
        description
        source {
          display
          url
        }
        photo
        servings
        directions {
          label
          steps {
            text
          }
        }
        ingredients {
          label
          ingredients {
            rangedAmount {
              min
              max
            }
            amount
            unit
            prep
            name
            toTaste
            optional
          }
        }
        timing {
          prep {
            value
            units
          }
          total {
            value
            units
          }
        }
        tags {
          id
          typeid
          label
        }
        dateAdded
        dateUpdated
      }
    }
  `;
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
