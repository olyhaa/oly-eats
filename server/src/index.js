const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const resolvers = require('./resolvers');

const RecipeAPI = require('./datasources/tags');

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
