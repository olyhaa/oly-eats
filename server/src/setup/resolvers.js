import TagResolver from '../resolvers/TagResolver';
import RecipeResolver from '../resolvers/RecipeResolver';

const Resolvers = {
  Query: { ...TagResolver.Query, ...RecipeResolver.Query },
  Mutation: { ...TagResolver.Mutation, ...RecipeResolver.Mutation },
};

export default Resolvers;
