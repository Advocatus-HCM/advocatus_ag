import { gql } from "graphql-tag";

export const ContractTypeDefs = gql`
    scalar JSON
    
    input UserAuth{
        email: String!
        token: String!
    }

    type Mutation{
        updateContract(data: JSON!, contractid: String!, userAuth: UserAuth!): JSON
        createContract(contract: JSON!, userAuth: UserAuth!): JSON
        deleteContract(contractid: String!, userAuth: UserAuth!): JSON
        getContractTypes(userAuth: UserAuth!): JSON
        getAllContracts(userAuth: UserAuth!): JSON
        getContract(contractid: String!, userAuth: UserAuth!): JSON
    }
`;