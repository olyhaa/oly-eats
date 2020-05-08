import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import { createStore } from './setup/database';
import resolvers from './setup/resolvers';
import TagTypeAPI from './datasources/TagTypeAPI';
import TagsAPI from './datasources/TagsAPI';
import RecipeAPI from './datasources/RecipeAPI';

const store = createStore();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    tagTypeAPI: new TagTypeAPI({ store }),
    tagsAPI: new TagsAPI({ store }),
    recipeAPI: new RecipeAPI({ store }),
  }),
});

server
  .listen()
  .then(({ url }) => {
    console.log(`🥕 Oly-Eats 🥕 server ready at ${url}`);
  })
  .catch(() => {
    console.error('ERROR - Unable to start server');
  });
