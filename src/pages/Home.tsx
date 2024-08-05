import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ICON_SIZE } from "@/lib/utils";
import { Plus } from "lucide-react";

import { columns } from "@/components/home/columns";
import { DataTable } from "@/components/home/Table";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/Loader";
import { usePasswords } from "@/lib/hooks/usePasswords";
import useQueryParams from "@/lib/hooks/useQueryParams";

export default function Home() {
  const { setParams, getParams } = useQueryParams();
  const { search } = getParams(["search"]);

  const { data, isLoading } = usePasswords({
    filter: {
      search,
    },
  });

  if (isLoading) return <Loader />;

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
            <h1
              className="
              text-2xl font-semibold
            "
            >
              Home
            </h1>
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
              <Button size="sm">
                <Plus size={ICON_SIZE} />
              </Button>
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
