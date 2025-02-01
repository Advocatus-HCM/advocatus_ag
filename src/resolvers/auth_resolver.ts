import { IResolvers } from "@graphql-tools/utils";
import { AuthAPI } from "../datasources/auth_api";

const authResolvers: IResolvers = {
  Mutation: {
    signup: async (_: any,
      { data }: { data: any }, { dataSources }: { dataSources: { authAPI: AuthAPI } }) => {
      try {
        const response = await dataSources.authAPI.signup(data);
        return {
          message: "Signup successful",
          success: true,
          response: response
        };
      } catch (error) {
          return {
            message: "Email already registered",
            success: false,
            response: error
          }
      }
    },
    signin: async (_: any, { email, password }: { email: string; password: string }, { dataSources }: { dataSources: { authAPI: AuthAPI } }) => {
      let response = null;
      try {
        response = await dataSources.authAPI.signin(email, password);
      } catch (error) {
          return{
            message: "Invalid credentials",
            success: false,
            response: error
          }
      }
      return {
        message: "Signin successful",
        success: true,
        response: response
      };
    }
  }
};

export { authResolvers };