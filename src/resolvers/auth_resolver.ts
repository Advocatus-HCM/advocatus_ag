import { IResolvers } from "@graphql-tools/utils";
import { AuthAPI } from "../datasources/auth_api";

const authResolvers: IResolvers = {
  Mutation: {
    signup: async (_: any, { email, password }: { email: string; password: string }, { dataSources }: { dataSources: { authAPI: AuthAPI } }) => {
      const response = await dataSources.authAPI.signin(email, password);
      return {
        message: "Signin successful",
        success: true,
        access_token: response.access_token,
        token_type: response.token_type,
        role: response.role,
      };
    },
    signin: async (_: any, { email, password }: { email: string; password: string }, { dataSources }: { dataSources: { authAPI: AuthAPI } }) => {
      const response = await dataSources.authAPI.signin(email, password);
      if (!response) {
        throw new Error("Signin failed");
      }
      return {
        message: "Signin  successful",
        success: true,
        access_token: response.access_token,
        token_type: response.token_type,
        role: response.role,
      };
    },
  },
};

export { authResolvers };