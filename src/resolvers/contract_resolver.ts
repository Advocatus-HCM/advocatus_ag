import { IResolvers } from "@graphql-tools/utils";
import { AuthAPI } from "../datasources/auth_api";
import { PersonalManagerAPI } from "../datasources/personal_manager_api";
import { stat } from "fs";


const ContractResolvers: IResolvers = {
    Mutation: {
        updateContract : async(
            _: any,
            { newrole, contractid, userAuth }: { newrole: string, contractid: string, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI, authAPI: AuthAPI } }
        ) => {
            let responsePersonalManager;
            let responseAuth;
        
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }
            catch{
                throw new Error("Invalid Token");
            }  
            //UpdateUserPersonalManager
            try{
                responsePersonalManager = await dataSources.personalManagerAPI.updateContractPersonalManagerMS(newrole, contractid, userAuth.email);
            }catch(error: any){
                console.error("Error updating contract in Personal Manager:", error);
                const errorDetails = error?.extensions?.response?.body?.errors || error.message;
                throw new Error(`Contract update failed in Personal Manager: ${JSON.stringify(errorDetails)}`);
            }
            //UpdateUserAuth
            try{
                responseAuth = await dataSources.authAPI.updateUserRoleAuth(contractid, newrole, userAuth.token);
            }catch(error: any){
                console.error("Error updating contract in Auth API:", error);
                const errorDetails = error?.extensions?.response?.body?.errors || error.message;
                throw new Error(`Contract update failed in Authentication: ${JSON.stringify(errorDetails)}`);
            }
            //Success
            return {
                message: "Contract updated successfully",
                success: true,
                AuthResponse: responseAuth,
                PersonalManagerResponse: responsePersonalManager,
            };

        },

        createContract: async(
            _: any,
            { createContractInput, userAuth }: { createContractInput: { user_email: string, type: string, salary: string, start_date: string, end_date: string, probation_end_date: string, role: string }, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI, authAPI: AuthAPI } }
        ) => {
               let responsePersonalManager;
               let responseAuth;
                //Validate Token
                try{
                    await dataSources.authAPI.verifyToken(userAuth.token);
                }
                catch{
                    throw new Error("Invalid Token");
                }
                //CreateContractPersonalManager 
                try{
                    responsePersonalManager = await dataSources.personalManagerAPI.createContractPersonalManagerMS(createContractInput.user_email, createContractInput.type, createContractInput.salary, createContractInput.start_date, createContractInput.end_date, createContractInput.probation_end_date, createContractInput.role, userAuth.email);
                }catch(error: any){
                    console.error("Error creating contract in Personal Manager:", error);
                    const status = error.extensions?.response?.status || error.status || error.statusCode;
                    const errorDetails = error.extensions?.response?.body?.errors || error.message;
                    if (status === 403) {
                      throw new Error("User does not have permission to create a contract.");
                    }
                    if(status === 500){
                        throw new Error("Error: User does not exists or has another contract");
                    }
                    throw new Error(`Contract creation failed in Personal Manager: ${JSON.stringify(errorDetails)}`);
                }
                //CreateContractAuth
                try{
                    responseAuth = await dataSources.authAPI.updateUserRoleAuth(createContractInput.user_email, createContractInput.role, userAuth.token);
                }catch(error: any){
                    console.error("Error creating contract in Auth API:", error);
                    const errorDetails = error?.extensions?.response?.body?.errors || error.message;
                    throw new Error(`Contract creation failed in Authentication: ${JSON.stringify(errorDetails)}`);
                }
                //Success
                return {
                    message: "Contract created successfully",
                    success: true,
                    AuthResponse: responseAuth,
                    PersonalManagerResponse: responsePersonalManager,
                };
            },
        
        deleteContract: async(
            _: any,
            { contractid, userAuth }: { contractid: string, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI, authAPI: AuthAPI } }
        ) => {
            let responsePersonalManager;
            let responseAuth;
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }
            catch{
                throw new Error("Invalid Token");
            }
            //DeleteContractPersonalManager
            try{
                responsePersonalManager = await dataSources.personalManagerAPI.deleteContractPersonalManagerMS(contractid, userAuth.email);
            }catch(error: any){
                console.error("Error deleting contract in Personal Manager:", error);
                const errorDetails = error?.extensions?.response?.body?.errors || error.message;
                throw new Error(`Contract deletion failed in Personal Manager: ${JSON.stringify(errorDetails)}`);
            }
            //DeleteContractAuth
            try{
                responseAuth = await dataSources.authAPI.updateUserRoleAuth(contractid, "desactivado", userAuth.token);
            }catch(error: any){
                console.error("Error deleting contract in Auth API:", error);
                const errorDetails = error?.extensions?.response?.body?.errors || error.message;
                throw new Error(`Contract deletion failed in Authentication: ${JSON.stringify(errorDetails)}`);
            }
            //Success
            return {
                message: "Contract deleted successfully",
                success: true,
                AuthResponse: responseAuth,
                PersonalManagerResponse: responsePersonalManager,
            };
        },

        getContractTypes: async(
            _: any,
            { userAuth }: { userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI, authAPI: AuthAPI } }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }
            catch{
                throw new Error("Invalid Token");
            }
            //GetContractTypes
            try{
                const response = await dataSources.personalManagerAPI.getContractTypesPersonalManagerMS(userAuth.email);
                return {
                    message: "Contract types found",
                    success: true,    
                    response: response
                };
            }catch(error){
                return {
                    message: "Error: Contract types not found",
                    success: false,
                    response: error
                };
            }
        },

        getAllContracts: async(
            _: any,
            { userAuth }: { userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI, authAPI: AuthAPI } }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }
            catch{
                throw new Error("Invalid Token");
            }
            //GetAllContracts
            try{
                const response = await dataSources.personalManagerAPI.getAllContractsPersonalManagerMS(userAuth.email);
                return {
                    message: "Contracts found",
                    success: true,    
                    response: response
                };
            }catch(error){
                return {
                    message: "Error: Contracts not found",
                    success: false,
                    response: error
                };
            }
        },

        getContract: async(
            _: any,
            { contractid, userAuth }: { contractid: string, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI, authAPI: AuthAPI } }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }
            catch{
                throw new Error("Invalid Token");
            }
            //GetContract
            try{
                const response = await dataSources.personalManagerAPI.getContractPersonalManagerMS(contractid, userAuth.email);
                return {
                    message: "Contract found",
                    success: true,    
                    response: response
                };
            }catch(error){
                return {
                    message: "Error: Contract not found",
                    success: false,
                    response: error
                };
            }
        }
    }
}

export { ContractResolvers };