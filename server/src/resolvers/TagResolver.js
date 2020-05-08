import { TAGS } from '../constants';

const TagResolver = {
  Query: {
    allTagTypes: (_, __, { dataSources }) =>
      dataSources.tagsAPI.getAllTagTypes(),
    allCategories: (_, __, { dataSources }) =>
      dataSources.tagsAPI.getAllTags({ type: TAGS.CATEGORY }),
    allCuisines: (_, __, { dataSources }) =>
      dataSources.tagsAPI.getAllTags({ type: TAGS.CUISINE }),
    allEquipment: (_, __, { dataSources }) =>
      dataSources.tagsAPI.getAllTags({ type: TAGS.EQUIPMENT }),
    allMealTypes: (_, __, { dataSources }) =>
      dataSources.tagsAPI.getAllTags({ type: TAGS.MEAL_TYPE }),
  },
  Mutation: {
    addTagType: (_, { label }, { dataSources }) =>
      dataSources.tagsAPI.addTagType({ label }),
    deleteTagType: (_, { id }, { dataSources }) =>
      dataSources.tagsAPI.deleteTagType({ id }),
    updateTagType: (_, { id, label }, { dataSources }) =>
      dataSources.tagsAPI.updateTagType({ id, label }),

    addCategory: (_, { label }, { dataSources }) =>
      dataSources.tagsAPI.addTag({ type: TAGS.CATEGORY, label }),
    addCuisine: (_, { label }, { dataSources }) =>
      dataSources.tagsAPI.addTag({ type: TAGS.CUISINE, label }),
    addEquipment: (_, { label }, { dataSources }) =>
      dataSources.tagsAPI.addTag({ type: TAGS.EQUIPMENT, label }),
    addMealType: (_, { label }, { dataSources }) =>
      dataSources.tagsAPI.addTag({ type: TAGS.MEAL_TYPE, label }),
    deleteTag: (_, { id }, { dataSources }) =>
      dataSources.tagsAPI.deleteTag({ id }),
    updateTag: (_, { id, typeid, label }, { dataSources }) =>
      dataSources.tagsAPI.updateTag({ id, typeid, label }),
  },
};

export default TagResolver;
