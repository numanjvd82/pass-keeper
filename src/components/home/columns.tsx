import { Password } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { EditPassword } from "./components/EditPassword";

export const columns: ColumnDef<Password>[] = [
  {
    header: "#",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => <EditPassword title={row.original.name} />,
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
  },
  {
    header: "Updated At",
    accessorKey: "updatedAt",
    cell: ({ row }) => new Date(row.original.updatedAt).toLocaleString(),
  },
];
