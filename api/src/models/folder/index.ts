import { list } from "./list";

export type Folder = {
  id: number;
  userId: number;
  name: string;
};

export const folderModel = {
  list,
};
