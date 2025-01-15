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

    type Mutation{
        updateContract(newrole: String!, contractid: String!, userAuth: UserAuth!): UpdateContractResponse
    }
`;