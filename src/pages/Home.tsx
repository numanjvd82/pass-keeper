import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { columns } from "@/components/home/columns";
import { AddPassword } from "@/components/home/components/AddPassword";
import { FolderDropdown } from "@/components/home/components/FolderDropdown";
import { DataTable } from "@/components/home/Table";
import { Input } from "@/components/ui/input";
import { useFolders } from "@/lib/hooks/useFolders";
import { usePasswords } from "@/lib/hooks/usePasswords";
import useQueryParams from "@/lib/hooks/useQueryParams";

export default function Home() {
  const { setParams, getParams } = useQueryParams();
  const { search, folder } = getParams(["search", "folder"]);

  const {
    data: folders,
    refetch: refetchFolders,
    isLoading: isFoldersLoading,
  } = useFolders();

  const { data, refetch: refetchPasswords } = usePasswords({
    filter: {
      search,
      folder,
    },
  });

  console.log(data);

  const Table = () => {
    if (!data) return null;
    if (data.length === 0) {
      return (
        <div className="text-center text-gray-500 mt-4">
          No passwords found. Try adding some.
        </div>
      );
    }

    return <DataTable columns={columns} data={data} />;
  };

  return (
    <div className="h-screen">
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center justify-center gap-2">
              <h1
                className="
              text-2xl font-semibold
            "
              >
                Home
              </h1>
              <FolderDropdown
                folders={folders}
                isLoading={isFoldersLoading}
                refetch={refetchFolders}
              />
            </div>
            <div className="flex items-center">
              <Input
                value={search}
                onChange={(e) =>
                  setParams({
                    search: e.target.value,
                  })
                }
                className="mr-2"
                placeholder="Search By Name"
              />
              <AddPassword refetch={refetchPasswords} />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table />
        </CardContent>
      </Card>
    </div>
  );
}
