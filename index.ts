import cors from "cors";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { authTypeDefs} from "./src/schemas/auth_schema";
import { authResolvers } from "./src/resolvers/auth_resolver";
import { AuthAPI } from "./src/datasources/auth_api";
import { PersonalManagerAPI } from "./src/datasources/personal_manager_api";
import { personalManagerTypeDefs } from "./src/schemas/personal_manager_schema";
import { PersonalManagerResolvers } from "./src/resolvers/personal_manager_resolver";
import { UserResolvers } from "./src/resolvers/user_resolver";
import { userTypeDefs } from "./src/schemas/user_schema";
import { ContractResolvers } from "./src/resolvers/contract_resolver";
import { ContractTypeDefs } from "./src/schemas/contract_schema";
import { TeamResolvers } from "./src/resolvers/team_resolver";
import { TeamTypeDefs } from "./src/schemas/team_schema";
import { AssistantTypeDefs} from "./src/schemas/assistant_schema";
import { AssistantResolvers} from "./src/resolvers/assistant_resolver";

const app = express();
app.use(cors());


const server = new ApolloServer({
  typeDefs: [authTypeDefs, personalManagerTypeDefs, userTypeDefs, ContractTypeDefs, TeamTypeDefs, AssistantTypeDefs],
  resolvers: [authResolvers, PersonalManagerResolvers, UserResolvers, ContractResolvers, TeamResolvers, AssistantResolvers],
  formatError: (err) => {
    console.error("GraphQL Error:", err);
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
      },
    }),
  });
  console.log(`🚀 API Gateway running at: ${url}`);
};

startServer();