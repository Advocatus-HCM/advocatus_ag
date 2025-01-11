import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { authTypeDefs } from "./src/schemas/auth_schema";
import { authResolvers } from "./src/resolvers/auth_resolver";
import { AuthAPI } from "./src/datasources/auth_api";
import {PersonalManagerAPI} from "./src/datasources/personal_manager_api";


const server = new ApolloServer({
  typeDefs: [authTypeDefs],
  resolvers: [authResolvers],
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