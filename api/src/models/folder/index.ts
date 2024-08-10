import { add } from "./add";
import { deleteFolder } from "./delete";
import { edit } from "./edit";
import { list } from "./list";

export type Folder = {
  id: number;
  userId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export const folderModel = {
  list,
  add,
  edit,
  delete: deleteFolder,
};
