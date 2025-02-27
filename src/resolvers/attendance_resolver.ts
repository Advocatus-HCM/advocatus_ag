import { IResolvers } from "@graphql-tools/utils";
import { AuthAPI } from "../datasources/auth_api";
import { AttendanceAPI } from "../datasources/attendance_api"

const AttendanceResolvers: IResolvers = {
    Mutation:{
        insertAttendance: async(
            _: any,
            { data, userAuth }: { data: any, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { attendanceAPI: AttendanceAPI, authAPI: AuthAPI } }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }
            catch{
                throw new Error("Invalid Token");
            }
            //Insert Attendance
            let response;
            try{
                //Success
                response = await dataSources.attendanceAPI.insertAttendance(data);
                return{
                    message: "Attendance inserted successfully",
                    success: true,
                    response: response
                }
            }catch(error){
                //Error
                return{
                    message: "Error inserting attendance",
                    success: false,
                    response: error
                }
            }
        },

        reportAbsences: async(
            _: any,
            { data, userAuth }: { data: any, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { attendanceAPI: AttendanceAPI, authAPI: AuthAPI } }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }
            catch{
                throw new Error("Invalid Token");
            }
            //Report Absences
            let response;
            try{
                //Success
                response = await dataSources.attendanceAPI.reportAbsences(data);
                return{
                    message: "Absences reported successfully",
                    success: true,
                    response: response
                }
            }catch(error){
                //Error
                return{
                    message: "Error reporting absences",
                    success: false,
                    response: error
                }
            }
        },

        getReport: async(
            _: any,
            { data, userAuth }: { data: any, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { attendanceAPI: AttendanceAPI, authAPI: AuthAPI } }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }
            catch{
                throw new Error("Invalid Token");
            }
            //Get Report
            let response;
            try{
                //Success
                response = await dataSources.attendanceAPI.getReport(data);
                return{
                    message: "Report retrieved successfully",
                    success: true,
                    response: response
                }
            }catch(error){
                //Error
                return{
                    message: "Error retrieving report",
                    success: false,
                    response: error
                }
            }
        },

        updateAbsence: async(
            _: any,
            { data, userAuth }: { data: any, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { attendanceAPI: AttendanceAPI, authAPI: AuthAPI } }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }
            catch{
                throw new Error("Invalid Token");
            }
            //Update Absence
            let response;
            try{
                //Success
                response = await dataSources.attendanceAPI.updateAbsence(data);
                return{
                    message: "Absence updated successfully",
                    success: true,
                    response: response
                }
            }catch(error){
                //Error
                return{
                    message: "Error updating absence",
                    success: false,
                    response: error
                }
            }
        },

        getAbsences: async(
            _: any,
            { userAuth }: { userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { attendanceAPI: AttendanceAPI, authAPI: AuthAPI } }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }
            catch{
                throw new Error("Invalid Token");
            }
            //Get Absences
            let response;
            try{
                //Success
                response = await dataSources.attendanceAPI.getAbsences();
                return{
                    message: "Absences retrieved successfully",
                    success: true,
                    response: response
                }
            }catch(error){
                //Error
                return{
                    message: "Error retrieving absences",
                    success: false,
                    response: error
                }
            }
        },

        getAttendances: async(
            _: any,
            { data, userAuth }: { data: any, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { attendanceAPI: AttendanceAPI, authAPI: AuthAPI } }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }
            catch{
                throw new Error("Invalid Token");
            }
            //Get Attendance
            let response;
            try{
                //Success
                response = await dataSources.attendanceAPI.getAttendances();
                return{
                    message: "Attendance retrieved successfully",
                    success: true,
                    response: response
                }
            }catch(error){
                //Error
                return{
                    message: "Error retrieving attendance",
                    success: false,
                    response: error
                }
            }
        },

        deleteAbsence: async(
            _: any,
            { data, userAuth }: { data: any, userAuth:{ email: string, token: string}},
            { dataSources }: { dataSources: { attendanceAPI: AttendanceAPI, authAPI: AuthAPI } }
        ) => {
            //Validate Token
            try{
                await dataSources.authAPI.verifyToken(userAuth.token);
            }
            catch{
                throw new Error("Invalid Token");
            }
            //Delete Absence
            let response;
            try{
                //Success
                response = await dataSources.attendanceAPI.deleteAbsence(data);
                return{
                    message: "Absence deleted successfully",
                    success: true,
                    response: response
                }
            }catch(error){
                //Error
                return{
                    message: "Error deleting absence",
                    success: false,
                    response: error
                }
            }
        },
    }

}

export { AttendanceResolvers };