import cors from "cors";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { authTypeDefs } from "./src/schemas/auth_schema";
import { authResolvers } from "./src/resolvers/auth_resolver";
import { AuthAPI } from "./src/datasources/auth_api";
import { PersonalManagerAPI } from "./src/datasources/personal_manager_api";
import { CasesAPI } from "./src/datasources/cases_api";
import { AttendanceAPI } from "./src/datasources/attendance_api";

import { personalManagerTypeDefs } from "./src/schemas/personal_manager_schema";
import { PersonalManagerResolvers } from "./src/resolvers/personal_manager_resolver";
import { UserResolvers } from "./src/resolvers/user_resolver";
import { userTypeDefs } from "./src/schemas/user_schema";
import { ContractResolvers } from "./src/resolvers/contract_resolver";
import { ContractTypeDefs } from "./src/schemas/contract_schema";
import { TeamResolvers } from "./src/resolvers/team_resolver";
import { TeamTypeDefs } from "./src/schemas/team_schema";
import { AssistantTypeDefs } from "./src/schemas/assistant_schema";
import { AssistantResolvers } from "./src/resolvers/assistant_resolver";
import { CasesTypeDefs } from "./src/schemas/cases_schema";
import { CasesResolvers } from "./src/resolvers/cases_resolver";
import { AttendanceTypeDefs } from "./src/schemas/attendance_schema";
import { AttendanceResolvers } from "./src/resolvers/attendance_resolver";

const app = express();
app.use(cors());

const myPlugin = {
  async requestDidStart(requestContext) {
    const startTime = Date.now();
    const method = requestContext.request.http?.method;
    console.log(`[INFO] ${method} ${new Date(startTime).toISOString()} received`);

    return {
      async willSendResponse(requestContext) {
        const duration = Date.now() - startTime;
        console.log(`[INFO] ${method} ${new Date(startTime).toISOString()} completed in ${duration}ms`);
      },
      async executionDidStart(requestContext) {
        const operationName = requestContext.operationName;
        const operationType = requestContext.operation?.operation;

        if (operationType === 'mutation') {
          console.log(`[MUTATION] ${operationName} started at ${new Date().toISOString()}`);
        }
      },
    };
  },
};

const server = new ApolloServer({
  typeDefs: [
    authTypeDefs,
    personalManagerTypeDefs,
    userTypeDefs,
    ContractTypeDefs,
    TeamTypeDefs,
    AssistantTypeDefs,
    CasesTypeDefs,
    AttendanceTypeDefs,
  ],
  resolvers: [
    authResolvers,
    PersonalManagerResolvers,
    UserResolvers,
    ContractResolvers,
    TeamResolvers,
    AssistantResolvers,
    CasesResolvers,
    AttendanceResolvers,
  ],
  plugins: [
    myPlugin
  ],
  formatError: (err) => {
    console.error("[ERROR] AG Error:", err);
    return {
      message: err.message || "An unexpected error occurred",
      code: err.extensions?.code || "INTERNAL_SERVER_ERROR",
      locations: err.locations,
      path: err.path,
    };
  },
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => ({
      dataSources: {
        authAPI: new AuthAPI(),
        personalManagerAPI: new PersonalManagerAPI(),
        casesAPI: new CasesAPI(),
        attendanceAPI: new AttendanceAPI(),
      },
    }),
  });
  console.log(`🚀 API Gateway running at: ${url}`);
};

startServer();