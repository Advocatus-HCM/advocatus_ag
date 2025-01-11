import { RESTDataSource } from "@apollo/datasource-rest";

export class PersonalManagerAPI extends RESTDataSource {  
  override baseURL = "http://advocatus_personal_manager_ms:8001"; // URL del microservicio de gestión personal

  async createUser(name: string, last_name: string, email: string, phone_number: string, profession: string, superior: string, team: string) {
    const body = {
      name,
      last_name,
      email,
      phone_number,
      profession,
      superior,
      team
    };

    return this.post("/create-user", {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}