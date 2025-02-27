import { RESTDataSource } from "@apollo/datasource-rest";
import dotenv from 'dotenv';
dotenv.config();

export class AttendanceAPI extends RESTDataSource {
    override baseURL = process.env.ATTENDANCE_MS_URL;

    async insertAttendance(data: any){
        return this.post("/attendance", {
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'x-apollo-operation-name': 'insertAttendance'
            },
        });
    }

    async reportAbsences(data: any){
        return this.post("/report-absences", {
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'x-apollo-operation-name': 'reportAbsences'
            },
        });
    }

    async getReport(data: any){
        return this.post("/get-report", {
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'x-apollo-operation-name': 'getReport'
            },
        });
    }

    async updateAbsence(data: any){
        return this.put("/update-absence", {
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'x-apollo-operation-name': 'updateAbsence'
            },
        });
    }

    async getAbsences(){
        return this.get("/get-absences", {
            headers: {
                'x-apollo-operation-name': 'getAbsences'
            },
        });
    }

    async getAttendances(){
        return this.get("/Get-attendances", {
            headers: {
                'x-apollo-operation-name': 'getAttendances'
            },
        });
    }

    async deleteAbsence(data: any){
        return this.delete("/delete-absence", {
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'x-apollo-operation-name': 'deleteAbsence'
            },
        });
    }
}