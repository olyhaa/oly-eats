const TagTypeResolver = {
  Query: {
    allTagTypes: (_, __, { dataSources }) =>
      dataSources.tagTypeAPI.getAllTagTypes(),
  },
  Mutation: {
    addTagType: (_, { label }, { dataSources }) =>
      dataSources.tagTypeAPI.addTagType({ label }),
    deleteTagType: (_, { id }, { dataSources }) =>
      dataSources.tagTypeAPI.deleteTagType({ id }),
    updateTagType: (_, { id, label }, { dataSources }) =>
      dataSources.tagTypeAPI.updateTagType({ id, label }),
  },
};

export default TagTypeResolver;
