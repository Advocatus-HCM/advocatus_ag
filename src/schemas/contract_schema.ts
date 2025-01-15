import { gql } from "graphql-tag";

export const ContractTypeDefs = gql`
    type UpdateContractResponse{
        message: String!
        success: Boolean!
        AuthResponse: JSON
        PersonalManagerResponse: JSON
    }

    input UserAuth{
        email: String!
        token: String!
    }

    input CreateContractInput{
        user_email: String!
        type: String!
        salary: String!
        start_date: String!
        end_date: String!
        probation_end_date: String!
        role: String!
    }

    type CreateContractResponse{
        message: String!
        success: Boolean!
        AuthResponse: JSON
        PersonalManagerResponse: JSON
    }

    type Mutation{
        updateContract(newrole: String!, contractid: String!, userAuth: UserAuth!): UpdateContractResponse
        createContract(createContractInput: CreateContractInput!, userAuth: UserAuth!): CreateContractResponse
    }
`;