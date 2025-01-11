import { gql } from "graphql-tag";

export const authTypeDefs = gql`
  type User {
    id_user: ID!
    email: String!
    role: String!
  }

  type AuthResponse {
    access_token: String!
    token_type: String!
  }

  input SignUpInput {
    email: String!
    password: String!
  }

  type Query {
    verifyToken: User
  }

  type Mutation {
    signin(email: String!, password: String!): AuthResponse
    signup(input: SignUpInput): User
  }
`;
