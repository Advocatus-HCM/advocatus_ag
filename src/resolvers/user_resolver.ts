import { IResolvers } from "@graphql-tools/utils";
import { AuthAPI } from "../datasources/auth_api";
import { PersonalManagerAPI } from "../datasources/personal_manager_api";

const UserResolvers: IResolvers = {
  Mutation: {
    createUser: async (
      _: any,
      { input, userEmail }: 
      {input: { name: string; last_name: string; email: string; password:string; phone_number: string; profession: string; superior?: string; team?: string;}, userEmail: string},
      { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI, authAPI: AuthAPI } }
    ) => {
      let responsePersonalManager;
      let responseAuth;

      try {
        responsePersonalManager = await dataSources.personalManagerAPI.createUserPersonalManagerMS(input.name, input.last_name, input.email, input.phone_number, input.profession, userEmail, input.superior || "", input.team || "");
      } catch (error: any) {
        console.error("Error creating user in Personal Manager:", error);
        const errorDetails = error?.extensions?.response?.body?.errors || error.message;
        throw new Error(`User creation failed in Personal Manager: ${JSON.stringify(errorDetails)}`);
      }

      try {
        const bodyAuth = {
          email: input.email,
          password: input.password
        };
        responseAuth = await dataSources.authAPI.signup(bodyAuth);
      } catch (error: any) {
        console.error("Error creating user in Auth API:", error);
        const errorDetails = error.extensions?.response?.body?.errors || error.message;
        throw new Error(`User creation failed in Authentification: ${JSON.stringify(errorDetails)}`);
      }

      return {
        message: "User created successfully",
        success: true,
        AuthResponse: responseAuth,
        PersonalManagerResponse: responsePersonalManager,
      };
    },
  },
};

export { UserResolvers };