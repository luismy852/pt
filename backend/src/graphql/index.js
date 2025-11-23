import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema.js';
import { root } from './resolver.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();


router.use('/graphql', authMiddleware, graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

export default router;
