import { IResolvers } from "@graphql-tools/utils";
import { AuthAPI } from "../datasources/auth_api";
import { PersonalManagerAPI } from "../datasources/personal_manager_api";
import { CasesAPI } from "../datasources/cases_api"

const CasesResolvers: IResolvers = {
    Mutation:{
        createCase: async(
            _: any,
            { data, userAuth }: { data: any, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { casesAPI: CasesAPI, authAPI: AuthAPI } }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }
            catch{
                throw new Error("Invalid Token");
            }
            //Create Case
            let response;
            try{
                response = await dataSources.casesAPI.createCase(data);
                return{
                    message: "Case created successfully",
                    success: true,
                    response: response
                }
            }catch(error){
                return{
                    message: "Error creating case",
                    success: false,
                    response: error
                }
            }
        },

        getCase: async(
            _: any,
            { caseid, userAuth }: { caseid: string, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { casesAPI: CasesAPI, authAPI: AuthAPI } }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }
            catch{
                throw new Error("Invalid Token");
            }
            //Get Case
            let response;
            try{
                response = await dataSources.casesAPI.getCase(caseid);
                return{
                    message: "Case retrieved successfully",
                    success: true,
                    response: response
                }
            }catch(error){
                return{
                    message: "Error retrieving case",
                    success: false,
                    response: error
                }
            }
        },

        getAllCases: async(
            _: any,
            { userAuth }: { userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { casesAPI: CasesAPI, authAPI: AuthAPI } }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }
            catch{
                throw new Error("Invalid Token");
            }
            //Get All Cases
            let response;
            try{
                response = await dataSources.casesAPI.getAllCases();
                return{
                    message: "Cases retrieved successfully",
                    success: true,
                    response: response
                }
            }catch(error: any){
                return{
                    message: "Error retrieving cases",
                    success: false,
                    response: error
                }
            }
        },

        updateCase: async(
            _: any,
            { caseid, data, userAuth }: { caseid: string, data: any, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { casesAPI: CasesAPI, authAPI: AuthAPI } }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }
            catch{
                throw new Error("Invalid Token");
            }
            //Update Case
            let response;
            try{
                response = await dataSources.casesAPI.updateCase(caseid, data);
                return{
                    message: "Case updated successfully",
                    success: true,
                    response: response
                }
            }catch(error){
                return{
                    message: "Error updating case",
                    success: false,
                    response: error
                }
            }
        },

        archiveCase: async(
            _: any,
            { caseid, userAuth }: { caseid: string, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { casesAPI: CasesAPI, authAPI: AuthAPI } }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }
            catch{
                throw new Error("Invalid Token");
            }
            //Archive Case
            let response;
            try{
                response = await dataSources.casesAPI.archiveCase(caseid);
                return{
                    message: "Case archived successfully",
                    success: true,
                    response: response
                }
            }catch(error){
                return{
                    message: "Error archiving case",
                    success: false,
                    response: error
                }
            }
        },

        permanentCaseDelete: async(
            _: any,
            { caseid, userAuth }: { caseid: string, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { casesAPI: CasesAPI, authAPI: AuthAPI } }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }
            catch{
                throw new Error("Invalid Token");
            }
            //Delete Case Permanently
            let response;
            try{
                response = await dataSources.casesAPI.permanentCaseDelete(caseid);
                return{
                    message: "Case deleted successfully",
                    success: true,
                    response: response
                }
            }catch(error){
                return{
                    message: "Error deleting case",
                    success: false,
                    response: error
                }
            }
        },
    }

};


export { CasesResolvers };