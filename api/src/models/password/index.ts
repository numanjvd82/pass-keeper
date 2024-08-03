import { generateListQuery } from "./list";

export type Password = {
  id: number;
  userId: number;
  passwordName: string;
  folder: string;
  username: string;
  password: string;
};

export const passwordModel = {
  list: generateListQuery,
};
