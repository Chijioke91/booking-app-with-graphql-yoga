import dotenv from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import { resolvers } from './resolvers';
import connectDb from './config/connectDb';
import models from './models';

dotenv.config();

connectDb();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(request) {
    return {
      models,
      request,
    };
  },
});

server.start({ port: process.env.PORT || 4000 }, () =>
  console.log(`server is up`)
);
