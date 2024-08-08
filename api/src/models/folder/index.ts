import { add } from "./add";
import { edit } from "./edit";
import { list } from "./list";

export type Folder = {
  id: number;
  userId: number;
  name: string;
};

export const folderModel = {
  list,
  add,
  edit,
};
