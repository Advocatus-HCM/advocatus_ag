import {gql} from 'apollo-server-express';

export const personalManagerTypeDefs = gql`
    // User
    type User{
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
    }

    input CreateUserInput {
        name: String!
        last_name: String!
        email: String!
        phone_number: String!
        profession: String!
        superior: String!
        team: String!
    }

    type Mutation{
        createUser(name: String!, last_name: String!, email: String!, phone_number: String!, profession: String!, superior: String!, team: String!): User
        // updateUser(name: String!, last_name: String!, role: String!)
        // deleteUser(user_id: String!)
    }


    //Assistant
    //Team
    //Contracts
`;