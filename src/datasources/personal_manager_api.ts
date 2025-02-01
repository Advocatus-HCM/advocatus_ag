import { RESTDataSource } from "@apollo/datasource-rest";

export class PersonalManagerAPI extends RESTDataSource {  
  // override baseURL = "http://localhost:8001"; // URL del microservicio de gestión personal
  override baseURL = "http://advocatus_personal_manager_ms:8001"; // URL del microservicio de gestión personal

  //////USERS
  async createUserPersonalManagerMS(data: any, userEmail: string) {

    return this.post("/create-user", {
      body: JSON.stringify(data),
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

  async updateContractPersonalManagerMS( data: any, email: string, userEmail: string) {
    return this.patch(`/update-contract/${email}`, {
      headers: {
        'user-email': userEmail,
        'Content-Type': 'application/json',
        'x-apollo-operation-name': 'updateContractPersonalManagerMS'
      },
      body: JSON.stringify(data)
    });
  }

  async createContractPersonalManagerMS(data: any, userEmail: string) {
    return this.post("/create-contract", {
      headers: {
        'user-email': userEmail,
        'Content-Type': 'application/json',
        'x-apollo-operation-name': 'createContractPersonalManagerMS'
      },
      body: JSON.stringify(data)
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

  async getContractTypesPersonalManagerMS(userEmail: string) {
    return this.get(`/get-types`, {
      headers: {
        'User-Email': userEmail,
        'x-apollo-operation-name': 'getContractTypesPersonalManagerMS'
      }
    });
  }

  async getAllContractsPersonalManagerMS(userEmail: string) {
    return this.get(`/get-contracts`, {
      headers: {
        'User-Email': userEmail,
        'x-apollo-operation-name': 'getAllContractsPersonalManagerMS'
      }
    });
  }

  async getContractPersonalManagerMS(email: string, userEmail: string) {
    return this.get(`/get-contract/${email}`, {
      headers: {
        'user-email': userEmail,
        'x-apollo-operation-name': 'getContractPersonalManagerMS'
      }
    });
  }

  //////TEAMS

  async createTeamPersonalManagerMS(team: any, userEmail: string) {
    return this.post("/create-team", {
      headers: {
        'User-Email': userEmail,
        'Content-Type': 'application/json',
        'x-apollo-operation-name': 'createTeamPersonalManagerMS'
      },
      body: JSON.stringify(team)
    });
  }


  async getTeamPersonalManagerMS(teamName: string,userEmail: string) {
    return this.get(`/get-team/${teamName}`, {
      headers: {
        'User-Email': userEmail,
        'x-apollo-operation-name': 'getTeamPersonalManagerMS'
      }
    });
  }

  async getTeamsPersonalManagerMS(userEmail: string) {
    return this.get(`/get-teams`, {
      headers: {
        'User-Email': userEmail,
        'x-apollo-operation-name': 'getTeamsPersonalManagerMS'
      }
    });
  }

  async updateTeamPersonalManagerMS(teamName: string, data: any, userEmail: string) {
    return this.patch(`/update-team/${teamName}`, {
      headers: {
        'User-Email': userEmail,
        'Content-Type': 'application/json',
        'x-apollo-operation-name': 'updateTeamPersonalManagerMS'
      },
      body: JSON.stringify(data)
    });
  }

  async deleteTeamPersonalManagerMS(teamName: string, userEmail: string) {
    return this.delete(`/delete-team/${teamName}`, {
      headers: {
        'User-Email': userEmail,
        'x-apollo-operation-name': 'deleteTeamPersonalManagerMS'
      }
    });
  }

  async getLeaderTeamsPersonalManagerMS(leader: string,userEmail: string) {
    return this.get(`/get-leader-teams/${leader}`, {
      headers: {
        'User-Email': userEmail,
        'x-apollo-operation-name': 'getLeaderTeamsPersonalManagerMS'
      }
    });
  }

  //////TeamMembers
  async addTeamMemberPersonalManagerMS(data: any, userEmail: string) {
    return this.post(`/add-member`, {
      headers: {
        'User-Email': userEmail,
        'x-apollo-operation-name': 'addTeamMemberPersonalManagerMS'
      },
      body: data
    });
  }

  async addTeamMembersPersonalManagerMS(data: any, userEmail: string) {
    return this.post(`/add-members`, {
      headers: {
        'User-Email': userEmail,
        'x-apollo-operation-name': 'addTeamMembersPersonalManagerMS'
      },
      body: data
    });
  }

  async removeTeamMemberPersonalManagerMS(data: any, userEmail: string) {
    return this.delete(`/remove-member`, {
      headers: {
        'User-Email': userEmail,
        'x-apollo-operation-name': 'removeTeamMemberPersonalManagerMS'
      },
      body: data
    });
  }

  async getTeamMembersPersonalManagerMS(teamName: string, userEmail: string) {
    return this.get(`/get-members/${teamName}`, {
      headers: {
        'User-Email': userEmail,
        'x-apollo-operation-name': 'getTeamMembersPersonalManagerMS'
      }
    });
  }

  /////ASSISTANTS
  async addAssistantPersonalManagerMS(data: any, userEmail: string) {
    return this.post(`/add-assistant`, {
      headers: {
        'User-Email': userEmail,
        'x-apollo-operation-name': 'addAssistantPersonalManagerMS'
      },
      body: data
    });
  }

  async getAssistantsPersonalManagerMS(email: string, userEmail: string) {
    return this.get(`/get-assistants/${email}`, {
      headers: {
        'User-Email': userEmail,
        'x-apollo-operation-name': 'getAssistantsPersonalManagerMS'
      }
    });
  }

  async removeAssistantPersonalManagerMS(data: any, userEmail: string) {
    return this.delete(`/remove-assistant`, {
      headers: {
        'User-Email': userEmail,
        'x-apollo-operation-name': 'removeAssistantPersonalManagerMS'
      },
      body: data
    });
  }

  async getAllAssistantsPersonalManagerMS(userEmail: string) {
    return this.get(`/get-all-assistants`, {
      headers: {
        'User-Email': userEmail,
        'x-apollo-operation-name': 'getAllAssistantsPersonalManagerMS'
      }
    });
  }
}