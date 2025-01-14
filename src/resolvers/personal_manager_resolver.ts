import { IResolvers } from "@graphql-tools/utils";
import { PersonalManagerAPI } from "../datasources/personal_manager_api";

const PersonalManagerResolvers: IResolvers = {
  Mutation: {
    createUserPersonalManagerMS: async (_: any, { input, userEmail }: { input: { name: string; last_name: string; email: string; phone_number: string; profession: string; superior?: string; team?: string }, userEmail: string }, { dataSources }: { dataSources: { personalManagerAPI: PersonalManagerAPI } }) => {
      const { name, last_name, email, phone_number, profession, superior, team } = input;
      const response = await dataSources.personalManagerAPI.createUserPersonalManagerMS(name, last_name, email, phone_number, profession, userEmail, superior || "", team || "");
      return {
        message: "User created successfully",
        success: true,
        response: response
      };
    },
  }
};

export { PersonalManagerResolvers };