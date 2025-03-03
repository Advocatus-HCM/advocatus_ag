import { IResolvers } from "@graphql-tools/utils";
import { PersonalManagerAPI } from "../datasources/personal_manager_api";
import { AuthAPI } from "../datasources/auth_api";

const PersonalManagerResolvers: IResolvers = {
  Mutation: {
    createUserPersonalManagerMS: async (_: any, { input, userEmail }: { input: { name: string; last_name: string; email: string; phone_number: string; profession: string; superior?: string; team?: string }, userEmail: string }, { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI } }) => {
      const { name, last_name, email, phone_number, profession, superior, team } = input;
      const response = await dataSources.personalManagerAPI.createUserPersonalManagerMS(input, userEmail);
      return {
        message: "User created successfully",
        success: true,
        response: response
      };
    },


    getUserPersonalManager: async (_: any, { email, userAuth }: { email: string, userAuth:{ email: string, token: string }}, { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI, authAPI: AuthAPI } }) => {
      //Verify token
      try{
        await dataSources.authAPI.verifyToken(userAuth.token);
      }
      catch{
            throw new Error("Invalid Token");
      }  
      
      try {
        const response = await dataSources.personalManagerAPI.getUserPersonalManager(email, userAuth.email);
        return {
            message: "User found",
            success: true,
            response: response,
          };
      } catch (error) {
        return {
          message: "Error: User not found",
          success: false,
          response: error
        };
      }
    },

    updateUserPersonalManager: async (_: any, { email, input, userAuth }: { email: string, input: any, userAuth:{ email: string, token: string }}, { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI, authAPI: AuthAPI } }) => {
      //Verify token
      try{
        await dataSources.authAPI.verifyToken(userAuth.token);
      }
      catch{
            throw new Error("Invalid Token");
      }  
      
      try {
        const response = await dataSources.personalManagerAPI.updateUserPersonalManager(email, input, userAuth.email);
        return {
            message: "User updated in Personal Manager",
            success: true,
            response: response,
          };
      } catch (error) {
        return {
          message: "Error: Could not update user",
          success: false,
          response: error
        };
      }

      //Verify if role is being updated
      // if(input.role){
      //   try{

      //   }catch(error){

      //   }
      // }
    },

    deleteUserPersonalManager: async (_: any, { email, userAuth }: { email: string, userAuth:{ email: string, token: string }}, { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI, authAPI: AuthAPI } }) => {
      //Verify token
      try{
        await dataSources.authAPI.verifyToken(userAuth.token);
      }
      catch{
            throw new Error("Invalid Token");
      }  
      
      try {
        const response = await dataSources.personalManagerAPI.deleteUserPersonalManager(email, userAuth.email);
        return {
            message: "User deleted",
            success: true,
            response: response,
          };
      } catch (error) {
        return {
          message: "Error: Could not delete user",
          success: false,
          response: error
        };
      }
    },

    getRoles: async (_: any,
      { userAuth }: { userAuth:{ email: string, token: string }},
      { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI, authAPI: AuthAPI } }) => {
        //Verify token
        try{
          await dataSources.authAPI.verifyToken(userAuth.token);
        }
        catch{
              throw new Error("Invalid Token");
        }

       //GetRoles
        try {
          const response = await dataSources.personalManagerAPI.getRolesPersonalManager(userAuth.email);
          return {
            message: "Roles found",
            success: true,
            response: response,
          }; 
        } catch (error) {
          return {
            message: "Error Getting Roles",
            success: false,
            response: error
          };
        }
      },
    getAllUsersPersonalManager: async (_: any,
      { userAuth }: { userAuth:{ email: string, token: string }},
      { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI, authAPI: AuthAPI } }) => {
        //Verify token
        try{
          await dataSources.authAPI.verifyToken(userAuth.token);
        }
        catch{
              throw new Error("Invalid Token");
        }

        //Get All Users
        try {
          const response = await dataSources.personalManagerAPI.getAllUsersPersonalManager(userAuth.email);
          return {
            message: "Success",
            success: true,
            response: response,
          };
        } catch (error) {
          return {
            message: "Error Getting Users",
            success: false,
            response: error
          };
        }
      },

      getProfessions: async (_: any,
        { userAuth }: { userAuth:{ email: string, token: string }},
        { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI, authAPI: AuthAPI } }) => {
          //Verify token
          try{
            await dataSources.authAPI.verifyToken(userAuth.token);
          }
          catch{
                throw new Error("Invalid Token");
          }

          //Get All Professions
          try {
            const response = await dataSources.personalManagerAPI.getProfessionsPersonalManager(userAuth.email);
            return {
              message: "Success",
              success: true,
              response: response,
            };
          } catch (error) {
            return {
              message: "Error Getting Professions",
              success: false,
              response: error
            };
          }
        },
  }
};

export { PersonalManagerResolvers };