import { IResolvers } from "@graphql-tools/utils";
import { AuthAPI } from "../datasources/auth_api";
import { PersonalManagerAPI } from "../datasources/personal_manager_api";
import { stat } from "fs";


const ContractResolvers: IResolvers = {
    Mutation: {
        updateContract : async(
            _: any,
            { data, contractid, userAuth }: { data: any, contractid: string, userAuth:{ email: string, token: string}},
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
                responsePersonalManager = await dataSources.personalManagerAPI.updateContractPersonalManagerMS(data, contractid, userAuth.email);
            }catch(error){
                return{
                    message: "Error updating contract in Personal Manager Microservice",
                    success: false,
                    AuthResponse: null,
                    PersonalManagerResponse: error
                }
            }
            //UpdateUserAuth
            try{
                responseAuth = await dataSources.authAPI.updateUserRoleAuth(contractid, data.role, userAuth.token);
            }catch(error){
                return{
                    message: "Error updating contract in Authentication Microservice",
                    success: false,
                    AuthResponse: error,
                    PersonalManagerResponse: responsePersonalManager
                }
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
            { contract, userAuth }: { contract: any, userAuth:{ email: string, token: string}},
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
                    responsePersonalManager = await dataSources.personalManagerAPI.createContractPersonalManagerMS(contract, userAuth.email);
                }catch(error){
                    return{
                        message: "Error creating contract in Personal Manager Microservice",
                        success: false,
                        AuthResponse: null,
                        PersonalManagerResponse: error
                    }
                }
                //CreateContractAuth
                try{
                    responseAuth = await dataSources.authAPI.updateUserRoleAuth(contract.user_email, contract.role, userAuth.token);
                }catch(error){
                    return{
                        message: "Error creating contract in Authentication Microservice",
                        success: false,
                        AuthResponse: error,
                        PersonalManagerResponse: responsePersonalManager
                    }
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
            }catch(error){
                return{
                    message: "Error deleting contract in Personal Manager Microservice",
                    success: false,
                    AuthResponse: null,
                    PersonalManagerResponse: error
                }
            }
            //DeleteContractAuth
            try{
                responseAuth = await dataSources.authAPI.updateUserRoleAuth(contractid, "desactivado", userAuth.token);
            }catch(error){
                return{
                    message: "Error deleting contract in Authentication Microservice",
                    success: false,
                    AuthResponse: error,
                    PersonalManagerResponse: responsePersonalManager
                }
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