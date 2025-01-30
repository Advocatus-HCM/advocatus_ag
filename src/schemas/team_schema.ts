import { gql } from "graphql-tag";

export const TeamTypeDefs = gql`
    type Mutation{
        createTeam(team: JSON!,userAuth: UserAuth!): JSON
        getTeam(team: String!, userAuth: UserAuth!): JSON
        getTeams(userAuth: UserAuth!): JSON
        updateTeam(team: String!, data: JSON!, userAuth: UserAuth!): JSON
        deleteTeam(team: String!, userAuth: UserAuth!): JSON
        getLeaderTeams(leader: String!, userAuth: UserAuth!): JSON

        addTeamMember(data: JSON!, userAuth: UserAuth!): JSON
        addTeamMembers(data: JSON!, userAuth: UserAuth!): JSON
        getTeamMembers(team: String!, userAuth: UserAuth!): JSON
        removeTeamMember(data: JSON!, userAuth: UserAuth!): JSON
    }
`;