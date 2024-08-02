import { ColumnDef } from "@tanstack/react-table";

export type PasswordEntry = {
  id: number;
  userId: number;
  name: string;
  folder: string;
  username: string;
  password: string;
};

export const columns: ColumnDef<PasswordEntry>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Username",
    accessorKey: "username",
  },
  {
    header: "Folder",
    accessorKey: "folder",
  },
  {
    header: "Password",
    accessorKey: "password",
    meta: {
      align: "right",
    },
  },
];
