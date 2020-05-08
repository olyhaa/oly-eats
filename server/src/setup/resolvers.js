import TagTypeResolver from '../resolvers/TagTypeResolver';
import TagResolver from '../resolvers/TagResolver';
import RecipeResolver from '../resolvers/RecipeResolver';

const Resolvers = {
  Query: {
    ...TagTypeResolver.Query,
    ...TagResolver.Query,
    ...RecipeResolver.Query,
  },
  Mutation: {
    ...TagTypeResolver.Mutation,
    ...TagResolver.Mutation,
    ...RecipeResolver.Mutation,
  },
};

export default Resolvers;
