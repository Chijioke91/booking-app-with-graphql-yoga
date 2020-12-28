import dotenv from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import { resolvers } from './resolvers';
import db from './utils/db';

dotenv.config();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { db },
});

server.start({ port: process.env.PORT || 4000 }, () =>
  console.log(`server is up`)
);
