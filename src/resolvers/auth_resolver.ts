import { IResolvers } from "@graphql-tools/utils";
import { AuthAPI } from "../datasources/auth_api";

const authResolvers: IResolvers = {
  Mutation: {
    signup: async (_: any, { email, password }: { email: string; password: string }, { dataSources }: { dataSources: { authAPI: AuthAPI } }) => {
      const response = await dataSources.authAPI.signup({ email, password });
      return {
        message: "Signup successful",
        success: true,
      };
    },
  },
};

export { authResolvers };