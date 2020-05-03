const { CATEGORY, CUISINE, EQUIPMENT, MEAL_TYPE } = require('./constants');

module.exports = {
  Query: {
    // METADATA QUERIES
    allTagTypes: (_, __, { dataSources }) =>
      dataSources.recipeAPI.getAllTagTypes(),
    allCategories: (_, __, { dataSources }) =>
      dataSources.recipeAPI.getAllTags({ type: CATEGORY }),
    allCuisines: (_, __, { dataSources }) =>
      dataSources.recipeAPI.getAllTags({ type: CUISINE }),
    allEquipment: (_, __, { dataSources }) =>
      dataSources.recipeAPI.getAllTags({ type: EQUIPMENT }),
    allMealTypes: (_, __, { dataSources }) =>
      dataSources.recipeAPI.getAllTags({ type: MEAL_TYPE }),
  },
  Mutation: {
    // METADATA MUTATIONS
    addTagType: (_, { label }, { dataSources }) =>
      dataSources.recipeAPI.addTagType({ label }),
    deleteTagType: (_, { id }, { dataSources }) =>
      dataSources.recipeAPI.deleteTagType({ id }),
    updateTagType: (_, { id, label }, { dataSources }) =>
      dataSources.recipeAPI.updateTagType({ id, label }),

    addCategory: (_, { label }, { dataSources }) =>
      dataSources.recipeAPI.addTag({ type: CATEGORY, label }),
    addCuisine: (_, { label }, { dataSources }) =>
      dataSources.recipeAPI.addTag({ type: CUISINE, label }),
    addEquipment: (_, { label }, { dataSources }) =>
      dataSources.recipeAPI.addTag({ type: EQUIPMENT, label }),
    addMealType: (_, { label }, { dataSources }) =>
      dataSources.recipeAPI.addTag({ type: MEAL_TYPE, label }),
  },
};
