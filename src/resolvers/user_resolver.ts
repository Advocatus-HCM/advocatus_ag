import { IResolvers } from "@graphql-tools/utils";
import { AuthAPI } from "../datasources/auth_api";
import { PersonalManagerAPI } from "../datasources/personal_manager_api";

const UserResolvers: IResolvers = {
  Mutation: {
    createUser: async (
      _: any,
      { data, userEmail }: 
      {data: any, userEmail: string},
      { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI, authAPI: AuthAPI } }
    ) => {
      let responsePersonalManager;
      let responseAuth;

      try {
        responsePersonalManager = await dataSources.personalManagerAPI.createUserPersonalManagerMS(data, userEmail);
      } catch (error: any) {
        return{
          message: "Error creating user in Personal Manager Microservice",
          success: false,
          AuthResponse: null,
          PersonalManagerResponse: error
        }
      }

      try {
        const bodyAuth = {
          email: data.email,
          password: data.password
        };
        responseAuth = await dataSources.authAPI.signup(bodyAuth);
      } catch (error: any) {
        return{
          message: "Error creating user in Authentication Microservice",
          success: false,
          AuthResponse: error,
          PersonalManagerResponse: responsePersonalManager
        }
      }
      //No errors
      return {
        message: "User created successfully",
        success: true,
        AuthResponse: responseAuth,
        PersonalManagerResponse: responsePersonalManager,
      };
    },
    
    deleteUser: async (_: any,{email, userEmail}:{email: string, userEmail:string},
    {dataSources}:{dataSources:{personalManagerAPI:PersonalManagerAPI, authAPI:AuthAPI}}
    ) =>{
      let responsePersonalManager;
      let responseAuth;
      try {
        responsePersonalManager = await dataSources.personalManagerAPI.deleteUserPersonalManager(email, userEmail);
      } catch (error: any) {
        return{
          message: "Error deleting user in Personal Manager Microservice",
          success: false,
          AuthResponse: null,
          PersonalManagerResponse: error
        }
      }
      
      try {
        responseAuth = await dataSources.authAPI.deleteUserAuth(email);
      } catch (error: any) {
        return{
          message: "Error deleting user in Authentication Microservice",
          success: false,
          AuthResponse: error,
          PersonalManagerResponse: responsePersonalManager
        }
      }
      //No Problems
      return {
        message: "User deleted successfully",
        success: true,
        AuthResponse: responseAuth,
        PersonalManagerResponse: responsePersonalManager,
      };
    }
  },
};

export { UserResolvers };