const { CATEGORY, CUISINE, EQUIPMENT, MEAL_TYPE } = require('./constants');

module.exports = {
  Query: {
    // METADATA QUERIES
    allTagTypes: (_, __, { dataSources }) =>
      dataSources.tagsAPI.getAllTagTypes(),
    allCategories: (_, __, { dataSources }) =>
      dataSources.tagsAPI.getAllTags({ type: CATEGORY }),
    allCuisines: (_, __, { dataSources }) =>
      dataSources.tagsAPI.getAllTags({ type: CUISINE }),
    allEquipment: (_, __, { dataSources }) =>
      dataSources.tagsAPI.getAllTags({ type: EQUIPMENT }),
    allMealTypes: (_, __, { dataSources }) =>
      dataSources.tagsAPI.getAllTags({ type: MEAL_TYPE }),
  },
  Mutation: {
    // METADATA MUTATIONS
    addTagType: (_, { label }, { dataSources }) =>
      dataSources.tagsAPI.addTagType({ label }),
    deleteTagType: (_, { id }, { dataSources }) =>
      dataSources.tagsAPI.deleteTagType({ id }),
    updateTagType: (_, { id, label }, { dataSources }) =>
      dataSources.tagsAPI.updateTagType({ id, label }),

    addCategory: (_, { label }, { dataSources }) =>
      dataSources.tagsAPI.addTag({ type: CATEGORY, label }),
    addCuisine: (_, { label }, { dataSources }) =>
      dataSources.tagsAPI.addTag({ type: CUISINE, label }),
    addEquipment: (_, { label }, { dataSources }) =>
      dataSources.tagsAPI.addTag({ type: EQUIPMENT, label }),
    addMealType: (_, { label }, { dataSources }) =>
      dataSources.tagsAPI.addTag({ type: MEAL_TYPE, label }),
    deleteTag: (_, { id }, { dataSources }) =>
      dataSources.tagsAPI.deleteTag({ id }),
    updateTag: (_, { id, typeid, label }, { dataSources }) =>
      dataSources.tagsAPI.updateTag({ id, typeid, label }),
  },
};
