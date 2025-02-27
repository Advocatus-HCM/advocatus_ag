import { RESTDataSource } from "@apollo/datasource-rest";
import dotenv from 'dotenv';
dotenv.config();

export class CasesAPI extends RESTDataSource {
    override baseURL = process.env.CASES_MS_URL;

    async createCase(data: any) {
        return this.post("/cases", {
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'x-apollo-operation-name': 'createCase'
            },
        });
    }

    async getCase(caseid: string) {
        return this.get(`/cases/${caseid}`, {
            headers: {
                'x-apollo-operation-name': 'getCase'
            },
        });
    }

    async getAllCases(){
        return this.get("/cases", {
            headers: {
                'x-apollo-operation-name': 'getAllCases'
            },
        });
    }

    async archiveCase(caseid: string){
        return this.delete(`/case/${caseid}`, {
            headers: {
                'x-apollo-operation-name': 'archiveCase'
            },
        });
    }

    async updateCase(caseid: string, data: any){
        return this.put(`/cases/${caseid}`, {
            body: data,
            headers: {
                'Content-Type': 'application/json',
                'x-apollo-operation-name': 'updateCase'
            },
        });
    }  

    async permanentCaseDelete(caseid: string){
        return this.delete(`/permanent/${caseid}`, {
            headers: {
                'x-apollo-operation-name': 'permanentCaseDelete'
            },
        });
    }
}