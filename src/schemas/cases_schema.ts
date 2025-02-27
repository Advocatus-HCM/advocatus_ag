import { gql } from "graphql-tag";

export const CasesTypeDefs = gql`
    type Mutation{
        createCase(data: JSON!, userAuth: UserAuth!): JSON
        updateCase(caseid: String!, data: JSON!, userAuth: UserAuth!): JSON
        archiveCase(caseid: String!, userAuth: UserAuth!): JSON
        getCase(caseid: String!, userAuth: UserAuth!): JSON
        getAllCases(userAuth: UserAuth!): JSON
        permanentCaseDelete(caseid: String!, userAuth: UserAuth!): JSON
    }
`;