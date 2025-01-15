import {gql} from "graphql-tag";

export const personalManagerTypeDefs = gql`
    scalar JSON


    input CreateUserPersonalManagerInput{
        name: String!
        last_name: String!
        email: String!
        phone_number: String!
        profession: String!
        superior: String
        team: String
    }

    type CreateUserResponsePersonalManagerMS {
        message: String!
        success: Boolean!
        response: JSON
    }

    type DeleteUserPersonalManagerResponse {
        message: String!
        success: Boolean!
        response: JSON
    }

    type Mutation{
        createUserPersonalManagerMS(input: CreateUserPersonalManagerInput, userEmail: String!): CreateUserResponsePersonalManagerMS
        deleteUserPersonalManager(email: String!, userEmail: String!): DeleteUserPersonalManagerResponse
    }
`;