import { Password } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Password>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "passwordName",
  },
  {
    header: "Folder",
    accessorKey: "folder",
  },
];
