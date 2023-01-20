import { gql } from '@apollo/client';

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
          type {
            id
            label
          }
          label
        }
        meta {
          dateAdded
          dateUpdated
        }
        isFavorite
      }
    }
  `;
};

export const getFavoriteRecipes = () => {
  return gql`
    query GetAllFavorites {
      favorites {
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
          type {
            id
            label
          }
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
          type {
            id
            label
          }
          label
        }
        meta {
          dateAdded
          dateUpdated
        }
        isFavorite
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
            label
            type {
              id
              label
            }
          }
          meta {
            dateAdded
            dateUpdated
          }
          isFavorite
        }
      }
    }
  `;
};

export const getUpdateRecipeMutation = () => {
  return gql`
    mutation UpdateRecipe($id: ID!, $recipe: RecipeInput!) {
      updateRecipe(id: $id, recipe: $recipe) {
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
            label
            type {
              id
              label
            }
          }
          meta {
            dateAdded
            dateUpdated
          }
          isFavorite
        }
      }
    }
  `;
};

export const getDeleteRecipeMutation = () => {
  return gql`
    mutation DeleteRecipe($id: ID!) {
      deleteRecipe(id: $id) {
        success
        message
      }
    }
  `;
};

export const getUpdateFavoriteRecipeMutation = () => {
  return gql`
    mutation UpdateFavoriteRecipe($id: ID!, $isFavorite: Boolean!) {
      updateFavoriteRecipe(id: $id, isFavorite: $isFavorite) {
        success
        message
      }
    }
  `;
};

export const getTagsListQuery = () => {
  return gql`
    query GetAllTags {
      allTagTypes {
        id
        label
        tags {
          id
          label
        }
      }
    }
  `;
};

export const getAddTagMutation = () => {
  return gql`
    mutation AddTag($typeid: ID!, $label: String!) {
      addTag(typeid: $typeid, label: $label) {
        success
        message
      }
    }
  `;
};

export const getUpdateTagMutation = () => {
  return gql`
    mutation UpdateTag($id: ID!, $label: String!) {
      updateTag(id: $id, label: $label) {
        success
        message
      }
    }
  `;
};

export const getDeleteTagMutation = () => {
  return gql`
    mutation DeleteTag($id: ID!) {
      deleteTag(id: $id) {
        success
        message
      }
    }
  `;
};

export const getAddTagTypeMutation = () => {
  return gql`
    mutation AddTagType($label: String!) {
      addTagType(label: $label) {
        success
        message
      }
    }
  `;
};

export const getUpdateTagTypeMutation = () => {
  return gql`
    mutation UpdateTagType($id: ID!, $label: String!) {
      updateTagType(id: $id, label: $label) {
        success
        message
      }
    }
  `;
};

export const getDeleteTagTypeMutation = () => {
  return gql`
    mutation DeleteTag($id: ID!) {
      deleteTagType(id: $id) {
        success
        message
      }
    }
  `;
};
