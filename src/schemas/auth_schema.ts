import { gql } from "graphql-tag";

export const authTypeDefs = gql`
  scalar JSON

  type User {
    id_user: ID!
    email: String!
    role: String!
  }

  type AuthResponse {
    message: String!
    success: Boolean!
    response: JSON
  }

  type SignUpResponse {
    message: String!
    success: Boolean!
    response: JSON
  }

  type DeleteUserAuthResponse {
    message: String!
    success: Boolean!
    response: JSON
  }

  input SignUpInput {
    email: String!
    password: String!
  }

  type Query {
    verifyToken: User
  }

  type Mutation {
    signin(email: String!, password: String!): JSON
    signup(data: JSON!): JSON
    deleteUserAuth(email: String!): JSON
  }
`;