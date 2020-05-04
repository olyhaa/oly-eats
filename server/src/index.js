import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import { createStore } from './utils';
import resolvers from './resolvers';
import TagsAPI from './datasources/tags';

const store = createStore();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    tagsAPI: new TagsAPI({ store }),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🥕 Oly-Eats 🥕 server ready at ${url}`);
});
