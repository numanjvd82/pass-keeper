import { add } from "./add";
import { generateListQuery } from "./list";

export type Password = {
  id: number;
  userId: number;
  passwordName: string;
  folderId: number;
  username: string;
  password: string;
  uri?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};

export const passwordModel = {
  list: generateListQuery,
  add,
};
