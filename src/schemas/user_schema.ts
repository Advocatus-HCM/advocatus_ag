import { gql } from "graphql-tag";
import { GraphQLJSON } from "graphql-type-json";

export const userTypeDefs = gql`
  scalar JSON

  type User {
    id_user: ID!
    name: String!
    last_name: String!
    email: String!
    phone_number: String!
    profession: String!
    superior: String!
    team: String!
  }

  type CreateUserResponse {
    message: String!
    success: Boolean!
    AuthResponse: JSON
    PersonalManagerResponse: JSON
  }

  input CreateUserInput {
    name: String!
    last_name: String!
    email: String!
    password: String!
    phone_number: String!
    profession: String!
    superior: String
    team: String
  }

  type DeleteUserResponse {
    message: String!
    success: Boolean!
    AuthResponse: JSON
    PersonalManagerResponse: JSON
  }

  type Mutation {
    createUser(input: CreateUserInput, userEmail: String!): CreateUserResponse
    deleteUser(email: String!, userEmail: String!): DeleteUserResponse
  }
`;