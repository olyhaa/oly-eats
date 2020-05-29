const TagResolver = {
  Query: {
    allTags: (_, { typeid }, { dataSources }) =>
      dataSources.tagsAPI.getAllTags({ typeid }),
  },
  Mutation: {
    addTag: (_, { typeid, label }, { dataSources }) =>
      dataSources.tagsAPI.addTag({ typeid, label }),
    deleteTag: (_, { id }, { dataSources }) =>
      dataSources.tagsAPI.deleteTag({ id }),
    updateTag: (_, { id, label }, { dataSources }) =>
      dataSources.tagsAPI.updateTag({ id, label }),
  },
};

export default TagResolver;
