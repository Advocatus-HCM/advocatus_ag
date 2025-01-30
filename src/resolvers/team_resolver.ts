import { IResolvers } from "@graphql-tools/utils";
import { AuthAPI } from "../datasources/auth_api";
import { PersonalManagerAPI } from "../datasources/personal_manager_api";

const TeamResolvers: IResolvers = {
    Mutation:{
        createTeam: async (_source: any,
            { team,  userAuth}: {team: any, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI , authAPI: AuthAPI} },
            _info: any
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }catch(error){
                throw new Error("Invalid Token");
            }
            //Create Team
            try{
                const response = await dataSources.personalManagerAPI.createTeamPersonalManagerMS(team, userAuth.email);
                return {
                    message: "Team created successfully",
                    success: true,
                    response: response
                };
            }catch(error){
                return {
                    message: "Error creating team",
                    success: false,
                    response: error
                }    
            }
        },

        getTeam: async (_source: any,
            { team,  userAuth}: {team: string, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI , authAPI: AuthAPI} }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }catch(error){
                throw new Error("Invalid Token");
            }
            //Get Team
            try{
                const response = await dataSources.personalManagerAPI.getTeamPersonalManagerMS(team, userAuth.email);
                return {
                    message: "Team retrieved successfully",
                    success: true,
                    response: response
                };
            }catch(error){
                return {
                    message: "Error getting team",
                    success: false,
                    response: error
                }    
            }
        },

        getTeams: async (_source: any,
            { userAuth}: { userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI , authAPI: AuthAPI} }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }catch(error){
                throw new Error("Invalid Token");
            }
            //Get Teams
            try{
                const response = await dataSources.personalManagerAPI.getTeamsPersonalManagerMS(userAuth.email);
                return {
                    message: "Teams retrieved successfully",
                    success: true,
                    response: response
                };
            }catch(error){
                return {
                    message: "Error getting teams",
                    success: false,
                    response: error
                }    
            }
        },

        updateTeam: async (_source: any,
            { team, data,  userAuth}: {team: string, data: any, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI , authAPI: AuthAPI} }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }catch(error){
                throw new Error("Invalid Token");
            }
            //Update Team
            try{
                const response = await dataSources.personalManagerAPI.updateTeamPersonalManagerMS(team, data, userAuth.email);
                return {
                    message: "Team updated successfully",
                    success: true,
                    response: response
                };
            }catch(error){
                return {
                    message: "Error updating team",
                    success: false,
                    response: error
                }    
            }
        },

        deleteTeam: async (_source: any,
            { team,  userAuth}: {team: string, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI , authAPI: AuthAPI} }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }catch(error){
                throw new Error("Invalid Token");
            }
            //Delete Team
            try{
                const response = await dataSources.personalManagerAPI.deleteTeamPersonalManagerMS(team, userAuth.email);
                return {
                    message: "Team deleted successfully",
                    success: true,
                    response: response
                };
            }catch(error){
                return {
                    message: "Error deleting team",
                    success: false,
                    response: error
                }    
            }
        },

        getLeaderTeams: async (_source: any,
            { leader,  userAuth}: {leader: string, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI , authAPI: AuthAPI} }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }catch(error){
                throw new Error("Invalid Token");
            }
            //Get Leader Teams
            try{
                const response = await dataSources.personalManagerAPI.getLeaderTeamsPersonalManagerMS(leader, userAuth.email);
                return {
                    message: "Leader teams retrieved successfully",
                    success: true,
                    response: response
                };
            }catch(error){
                return {
                    message: "Error getting leader teams",
                    success: false,
                    response: error
                }    
            }
        },

        addTeamMember: async (_source: any,
            { data,  userAuth}: {data: any, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI , authAPI: AuthAPI} }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }catch(error){
                throw new Error("Invalid Token");
            }
            //Add Team Member
            try{
                const response = await dataSources.personalManagerAPI.addTeamMemberPersonalManagerMS(data, userAuth.email);
                return {
                    message: "Team member added successfully",
                    success: true,
                    response: response
                };
            }catch(error){
                return {
                    message: "Error adding team member",
                    success: false,
                    response: error
                }    
            }
        },

        addTeamMembers: async (_source: any,
            { data,  userAuth}: {data: any, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI , authAPI: AuthAPI} }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }catch(error){
                throw new Error("Invalid Token");
            }
            //Add Team Member
            try{
                const response = await dataSources.personalManagerAPI.addTeamMemberPersonalManagerMS(data, userAuth.email);
                return {
                    message: "Team members added successfully",
                    success: true,
                    response: response
                };
            }catch(error){
                return {
                    message: "Error adding team members",
                    success: false,
                    response: error
                }    
            }
        },

        getTeamMembers: async (_source: any,
            { team,  userAuth}: {team: string, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI , authAPI: AuthAPI} }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }catch(error){
                throw new Error("Invalid Token");
            }
            //Get Team Members
            try{
                const response = await dataSources.personalManagerAPI.getTeamMembersPersonalManagerMS(team, userAuth.email);
                return {
                    message: "Team members retrieved successfully",
                    success: true,
                    response: response
                };
            }catch(error){
                return {
                    message: "Error getting team members",
                    success: false,
                    response: error
                }    
            }
        },

        removeTeamMember: async (_source: any,
            { data,  userAuth}: {data: any, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI , authAPI: AuthAPI} }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }catch(error){
                throw new Error("Invalid Token");
            }
            //Remove Team Member
            try{
                const response = await dataSources.personalManagerAPI.removeTeamMemberPersonalManagerMS(data, userAuth.email);
                return {
                    message: "Team member removed successfully",
                    success: true,
                    response: response
                };
            }catch(error){
                return {
                    message: "Error removing team member",
                    success: false,
                    response: error
                }    
            }
        }
    }
}

export { TeamResolvers };