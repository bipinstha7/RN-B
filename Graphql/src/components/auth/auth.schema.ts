import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: ID!
    email: String!

    # If a declared field's type is in [Square Brackets],
    # it's an array of the specified type. If an array has
    # an exclamation point after it, the array cannot be
    # null, but it can be empty.

    #trips: [Launch]!
    token: String
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String): User
  }
`;
