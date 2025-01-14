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

const server = new ApolloServer({
  typeDefs: [authTypeDefs, personalManagerTypeDefs, userTypeDefs],
  resolvers: [authResolvers, PersonalManagerResolvers, UserResolvers],
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