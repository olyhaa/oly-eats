import gql from 'graphql-tag';
// @ts-ignore
import RecipeData from '../recipeData/recipes.json';

export const removeNulls = (obj) => {
  let newObj;
  if (Array.isArray(obj)) {
    newObj = [];
    for (let i = 0; i < obj.length; i++) {
      newObj.push(removeNulls(obj[i]));
    }
  } else {
    newObj = {};
    if (obj) {
      Object.keys(obj).forEach((key) => {
        if (obj[key] && typeof obj[key] === 'object') {
          newObj[key] = removeNulls(obj[key]); // recurse
        } else if (obj[key] != null) {
          newObj[key] = obj[key]; // copy value
        }
      });
    }
  }

  return newObj;
};

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
        meta {
          dateAdded
          dateUpdated
        }
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
        meta {
          dateAdded
          dateUpdated
        }
      }
    }
  `;
};

export const getAddRecipeMutation = () => {
  return gql`
    mutation AddRecipe($recipe: RecipeInput!) {
      addRecipe(recipe: $recipe) {
        success
        message
        recipe {
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
          meta {
            dateAdded
            dateUpdated
          }
        }
      }
    }
  `;
};

export const getTagsListQuery = () => {
  return gql`
    query GetTags($typeid: ID!) {
      allTags(typeid: $typeid) {
        id
        type {
          id
          label
        }
        label
      }
    }
  `;
};
