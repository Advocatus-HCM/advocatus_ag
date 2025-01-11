import { IResolvers } from "@graphql-tools/utils";
import { PersonalManagerAPI } from "../datasources/personal_manager_api";

const PersonalManagerResolvers: IResolvers = {
  Mutation: {
    createUser: async (_: any, {name, last_name, email, phone_number, profession, superior, team}:{ name: string; last_name: string; email: string; phone_number: string; profession: string; superior: string; team: string }, { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI } }) => {
    const response = await dataSources.personalManagerAPI.createUser(name, last_name, email, phone_number, profession, superior, team);
      return {
        message: "User created successfully",
        success: true
      };
    },
  }
};

export { PersonalManagerResolvers };