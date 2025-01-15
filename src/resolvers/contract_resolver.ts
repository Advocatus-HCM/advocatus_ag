import { IResolvers } from "@graphql-tools/utils";
import { AuthAPI } from "../datasources/auth_api";
import { PersonalManagerAPI } from "../datasources/personal_manager_api";


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
    }
}

export { ContractResolvers };