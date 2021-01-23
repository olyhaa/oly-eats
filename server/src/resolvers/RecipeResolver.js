const RecipeResolver = {
  Query: {
    recipes: (_, __, { dataSources }) => dataSources.recipeAPI.getAllRecipes(),
    recipe: (_, { id }, { dataSources }) =>
      dataSources.recipeAPI.getRecipe({ id }),
    favorites: (_, __, { dataSources }) =>
      dataSources.recipeAPI.getFavoriteRecipes(),
  },
  Mutation: {
    addRecipe: (_, { recipe }, { dataSources }) =>
      dataSources.recipeAPI.addRecipe({ recipe }),
    deleteRecipe: (_, { id }, { dataSources }) =>
      dataSources.recipeAPI.deleteRecipe({ id }),
    updateRecipe: (_, { id, recipe }, { dataSources }) =>
      dataSources.recipeAPI.updateRecipe({ id, recipe }),
    updateFavoriteRecipe: (_, { id, isFavorite }, { dataSources }) =>
      dataSources.recipeAPI.updateFavoriteRecipe({ id, isFavorite }),
  },
};

export default RecipeResolver;
