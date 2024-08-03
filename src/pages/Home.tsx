import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ICON_SIZE } from "@/lib/utils";
import { Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { columns, PasswordEntry } from "@/home/columns";
import { DataTable } from "@/home/Table";
import useQueryParams from "@/lib/hooks/useQueryParams";

const passwordEntries: PasswordEntry[] = [
  {
    id: 1,
    userId: 101,
    name: "Email Account",
    folder: "Personal",
    username: "user@example.com",
    password: "encryptedPassword1",
  },
  {
    id: 2,
    userId: 101,
    name: "Bank Account",
    folder: "Finance",
    username: "bankuser123",
    password: "encryptedPassword2",
  },
  {
    id: 3,
    userId: 102,
    name: "Social Media",
    folder: "Social",
    username: "socialuser456",
    password: "encryptedPassword3",
  },
];

export default function Home() {
  const { setParams, getParams } = useQueryParams();
  const { search } = getParams(["search"]);
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
          <DataTable columns={columns} data={passwordEntries} />
        </CardContent>
      </Card>
    </div>
  );
}
