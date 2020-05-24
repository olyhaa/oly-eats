import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import TagTypeResolver from '../resolvers/TagTypeResolver';
import TagResolver from '../resolvers/TagResolver';
import RecipeResolver from '../resolvers/RecipeResolver';

const returnOnError = (operation, alternative) => {
  try {
    return operation();
  } catch (e) {
    return alternative;
  }
};

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
  ISODate: new GraphQLScalarType({
    name: 'ISODate',
    description: 'ISODate custom scalar type',
    parseValue(value) {
      // value from the client
      return returnOnError(
        () => (value == null ? null : new Date(value)),
        null
      );
    },
    serialize(value) {
      // value sent to the client
      return value instanceof Date ? value.toISOString() : null;
    },
    parseLiteral(ast) {
      // ast value is always in string format
      if (ast.kind === Kind.INT) {
        return ast.kind === Kind.STRING ? parseValue(ast.value) : null;
      }
      return null;
    },
  }),
};

export default Resolvers;
