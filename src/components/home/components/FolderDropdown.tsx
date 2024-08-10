import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useQueryParams from "@/lib/hooks/useQueryParams";
import { Folder } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AddFolder } from "./AddFolder";
import { DeleteFolder } from "./DeleteFolder";
import { EditFolder } from "./EditFolder";

type Props = {
  folders: Folder[] | undefined;
  isLoading: boolean;
  refetch: () => void;
};

export const FolderDropdown: React.FC<Props> = ({
  folders,
  isLoading,
  refetch,
}) => {
  const [open, setOpen] = useState(false);
  const { setParams, getParams, deleteParams } = useQueryParams();

  const { folder: folderName } = getParams(["folder"]);

  if (isLoading) {
    return null;
  }

  if (!folders) {
    return null;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {folderName
            ? folders.find(({ name }) => name === folderName)?.name
            : "Select Folder"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          <div className="flex flex-col justify-center">
            <AddFolder refetch={refetch} />
            <CommandInput placeholder="Search Folder" />
          </div>
          <CommandList>
            <CommandEmpty>No Folder found.</CommandEmpty>
            <CommandGroup>
              {folders.map(({ name, id, userId }) => (
                <CommandItem
                  key={id}
                  value={name}
                  onSelect={(currentValue) => {
                    currentValue === folderName
                      ? deleteParams(["folder"])
                      : setParams({ folder: currentValue });
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  <div className="flex flex-1 justify-between items-center">
                    <div className="flex items-center">
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          folderName === name ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {name}
                    </div>
                    <div className="flex gap-1">
                      <EditFolder
                        folder={{
                          id,
                          name,
                          userId,
                        }}
                        refetch={refetch}
                        closeFolderDropdown={() => setOpen(false)}
                      />
                      <DeleteFolder
                        id={id}
                        refetch={refetch}
                        closeFolderDropdown={() => setOpen(false)}
                      />
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
