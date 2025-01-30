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

  async getUserPersonalManager(email: string, userEmail: string) {
    return this.get(`/get-user/${email}`, {
      headers: {
        'user-email': userEmail,
        'x-apollo-operation-name': 'getUserPersonalManager'
      }
    });
  }

  async updateUserPersonalManager(email: string, data: any){
    return this.put(`/update-user/${email}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-apollo-operation-name': 'updateUserPersonalManager'
      },
      body: JSON.stringify(data)
    });
  }

  async getRolesPersonalManager(userEmail: string) {
    return this.get(`/get-roles`, {
      headers: {
        'User-Email': userEmail,
        'x-apollo-operation-name': 'getRoles'
      }
    });
  }

  async getAllUsersPersonalManager(userEmail: string) {
    return this.get(`/get-users`, {
      headers: {
        'User-Email': userEmail,
        'x-apollo-operation-name': 'getAllUsers'
      }
    });
  }

  async getProfessionsPersonalManager(userEmail: string) {
    return this.get(`/get-professions`, {
      headers: {
        'User-Email': userEmail,
        'x-apollo-operation-name': 'getProfessions'
      }
    });
  }

  //////CONTRACTS

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

  async createContractPersonalManagerMS(user_email: string, type: string, salary: string, start_date: string, end_date: string, probation_end_date: string, role: string, emailheader: string) {
    const body = {
      user_email: user_email,
      type: type,
      salary: salary,
      start_date: start_date,
      end_date: end_date,
      probation_end_date: probation_end_date,
      role: role,
    }
    return this.post("/create-contract", {
      headers: {
        'user-email': emailheader,
        'Content-Type': 'application/json',
        'x-apollo-operation-name': 'createContractPersonalManagerMS'
      },
      body: JSON.stringify(body)
    });
  }

  async deleteContractPersonalManagerMS(email: string, userEmail: string) {
    return this.delete(`/delete-contract/${email}`, {
      headers: {
        'user-email': userEmail,
        'x-apollo-operation-name': 'deleteContractPersonalManagerMS'
      }
    });
  }
}