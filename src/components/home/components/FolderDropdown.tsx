import { Check, ChevronsUpDown, PlusIcon } from "lucide-react";
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
import { useFolders } from "@/lib/hooks/useFolders";
import useQueryParams from "@/lib/hooks/useQueryParams";
import { cn } from "@/lib/utils";

export function FolderDropdown() {
  const [open, setOpen] = useState(false);
  const { setParams, getParams, deleteParams } = useQueryParams();
  const { data: folders, isLoading } = useFolders();

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
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <div className="flex flex-col justify-center">
            {/* Replace button with add folder modal */}
            <Button className="items-stretch" size="sm" variant="outline">
              <PlusIcon className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
            <CommandInput placeholder="Search Folder" />
          </div>
          <CommandList>
            <CommandEmpty>No Folder found.</CommandEmpty>
            <CommandGroup>
              {folders.map(({ name, id }) => (
                <CommandItem
                  key={id}
                  value={name}
                  onSelect={(currentValue) => {
                    currentValue === folderName
                      ? deleteParams(["folder"])
                      : setParams({ folder: currentValue });
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      folderName === name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
