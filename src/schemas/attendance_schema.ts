import { gql } from "graphql-tag";

export const AttendanceTypeDefs = gql`
    type Mutation{
        insertAttendance(data: JSON!, userAuth: UserAuth!): JSON
        reportAbsences(data: JSON!, userAuth: UserAuth!): JSON
        getReport(data: JSON!, userAuth: UserAuth!): JSON
        updateAbsence(data: JSON!, userAuth: UserAuth!): JSON
        getAbsences(userAuth: UserAuth!): JSON
        getAttendances(userAuth: UserAuth!): JSON
        deleteAbsence(data: JSON!, userAuth: UserAuth!): JSON
    }
`;