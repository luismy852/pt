import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Program {
    id: ID!
    name: String!
    description: String
    start_date: String
    status: String
  }

  type ProgramPage {
    items: [Program!]!
    total: Int!
  }

  type Query {
    programs(page: Int, filter: String): ProgramPage
  }
`);
