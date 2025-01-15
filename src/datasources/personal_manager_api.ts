import { RESTDataSource } from "@apollo/datasource-rest";

export class PersonalManagerAPI extends RESTDataSource {  
  override baseURL = "http://localhost:8001"; // URL del microservicio de gestión personal

  async createUserPersonalManagerMS(name: string,
    last_name: string,
    email: string,
    phone_number: string,
    profession: string,
    userEmail: string,
    superior?: string,
    team?: string) {

    const body: any = {
      name: name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      profession: profession,
    };

    if (superior) {
      body.superior = superior;
    }

    if (team) {
      body.team = team;
    }

    return this.post("/create-user", {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'user-email': userEmail,
        'x-apollo-operation-name': 'createUserPersonalManagerMS'
      },
    });
  }

  async deleteUserPersonalManager(email: string, userEmail: string) {
    return this.delete(`/delete-user/${email}`, {
      headers: {
        'user-email': userEmail,
        'x-apollo-operation-name': 'deleteUserPersonalManager'
      }
    });
  }

  async updateContractPersonalManagerMS( newRole: string, email: string, userEmail: string) {
    const body = {
      role: newRole
    }
    return this.patch(`/update-contract/${email}`, {
      headers: {
        'user-email': userEmail,
        'Content-Type': 'application/json',
        'x-apollo-operation-name': 'updateContractPersonalManagerMS'
      },
      body: JSON.stringify(body)
    });
  }
}