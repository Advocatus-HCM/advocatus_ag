import { IResolvers } from "@graphql-tools/utils";
import { AuthAPI } from "../datasources/auth_api";
import { PersonalManagerAPI } from "../datasources/personal_manager_api";

const AssistantResolvers: IResolvers = {
    Mutation: {
        addAssistant: async (_: any,
            { data, userAuth }: { data: any, userAuth: { email: string, token: string } },
            { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI, authAPI: AuthAPI } }) => {

            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            } catch(error){
                throw new Error("Invalid Token");
            }

            //Add Assistant
            try {
                const response = await dataSources.personalManagerAPI.addAssistantPersonalManagerMS(data, userAuth.email);
                return {
                    message: "Assistant added successfully",
                    success: true,
                    response: response
                };
            } catch (error) {
                return {
                    message: "Assistant addition failed",
                    success: false,
                    response: error
                }
            }
        },

        getAssistants: async (_: any,
            { userid, userAuth }: { userid: string, userAuth: { email: string, token: string } },
            { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI, authAPI: AuthAPI } }) => {

            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            } catch(error){
                throw new Error("Invalid Token");
            }

            //Get Assistants
            try {
                const response = await dataSources.personalManagerAPI.getAssistantsPersonalManagerMS(userid, userAuth.email);
                return {
                    message: "Assistants retrieved successfully",
                    success: true,
                    response: response
                };
            } catch (error) {
                return {
                    message: "Assistants retrieval failed",
                    success: false,
                    response: error
                }
            }
        },

        removeAssistant: async (_: any,
            { data, userAuth }: { data: any, userAuth: { email: string, token: string } },
            { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI, authAPI: AuthAPI } }) => {

            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            } catch(error){
                throw new Error("Invalid Token");
            }

            //Remove Assistant
            try {
                const response = await dataSources.personalManagerAPI.removeAssistantPersonalManagerMS(data, userAuth.email);
                return {
                    message: "Assistant removed successfully",
                    success: true,
                    response: response
                };
            } catch (error) {
                return {
                    message: "Assistant removal failed",
                    success: false,
                    response: error
                }
            }
        },

        getAllAssistants: async (_: any,
            { userAuth }: { userAuth: { email: string, token: string } },
            { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI, authAPI: AuthAPI } }) => {

            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            } catch(error){
                throw new Error("Invalid Token");
            }

            //Get All Assistants
            try {
                const response = await dataSources.personalManagerAPI.getAllAssistantsPersonalManagerMS(userAuth.email);
                return {
                    message: "All Assistants retrieved successfully",
                    success: true,
                    response: response
                };
            } catch (error) {
                return {
                    message: "All Assistants retrieval failed",
                    success: false,
                    response: error
                }
            }
        },
    }
}

export {AssistantResolvers};