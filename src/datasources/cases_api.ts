import { RESTDataSource } from "@apollo/datasource-rest";

export class CasesAPI extends RESTDataSource {
    override baseURL = "http://localhost:8002";
    // override baseURL = "http://advocatus_cases_ms:8002";

    async createCase(data: any) {
        return this.post("/cases/", {
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
        return this.get("/cases/", {
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
}