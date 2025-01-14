import { IResolvers } from "@graphql-tools/utils";
import { AuthAPI } from "../datasources/auth_api";

const authResolvers: IResolvers = {
  Mutation: {
    signup: async (_: any, { input }: { input: { email: string; password: string } }, { dataSources }: { dataSources: { authAPI: AuthAPI } }) => {
      try {
        const response = await dataSources.authAPI.signup(input);
        return {
          message: "Signup successful",
          success: true,
          response: response
        };
      } catch (error) {
          return {
            message: "Email already registered",
            success: false,
            response: null
          }
      }
    },
    signin: async (_: any, { email, password }: { email: string; password: string }, { dataSources }: { dataSources: { authAPI: AuthAPI } }) => {
      try {
        const response = await dataSources.authAPI.signin(email, password);
        if (!response) {
          throw new Error("Signin failed");
        }
        return {
          message: "Signin successful",
          success: true,
          response: response
        };
      } catch (error) {
        console.error("Error during signin:", error);
        throw new Error(`Signin failed: ${error}`);
      }
    }
  }
};

export { authResolvers };