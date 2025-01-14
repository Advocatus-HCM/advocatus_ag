import { IResolvers } from "@graphql-tools/utils";
import { AuthAPI } from "../datasources/auth_api";
import { PersonalManagerAPI } from "../datasources/personal_manager_api";

const UserResolvers: IResolvers = {
  Mutation: {
    createUser: async (
      _: any,
      { input }: 
      {input: { name: string; last_name: string; email: string; password:string; phone_number: string; profession: string; superior: string; team: string;}},
      { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI, authAPI: AuthAPI } }
    ) => {
      let responsePersonalManager;
      let responseAuth;

      try {
        responsePersonalManager = await dataSources.personalManagerAPI.createUserPersonalManagerMS(input.name, input.last_name, input.email, input.phone_number, input.profession, input.superior, input.team);
      } catch (error) {
        console.error("Error creating user in Personal Manager:", error);
        throw new Error(`User creation failed in Personal Manager: ${error}`);
      }

      try {
        const bodyAuth = {
          email: input.email,
          password: input.password
        };
        responseAuth = await dataSources.authAPI.signup(bodyAuth);
      } catch (error) {
        console.error("Error creating user in Auth API:", error);
        throw new Error(`User creation failed in Auth API: ${error}`);
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