import { gql } from "graphql-tag";

export const AssistantTypeDefs = gql`
    type Mutation{
        addAssistant(data: JSON!, userAuth: UserAuth!): JSON
        getAssistants(userid: String!, userAuth: UserAuth!): JSON
        removeAssistant(data: JSON!, userAuth: UserAuth!): JSON
        getAllAssistants(userAuth: UserAuth!): JSON
    }
`;