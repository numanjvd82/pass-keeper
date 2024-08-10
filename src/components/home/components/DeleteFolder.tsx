import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { useDeleteFolder } from "@/lib/hooks/data/useDeleteFolder";
import { Trash } from "lucide-react";
import { useState } from "react";

type Props = {
  id: number;
  closeFolderDropdown: () => void;
  refetch: () => void;
};

export const DeleteFolder: React.FC<Props> = ({
  id,
  refetch,
  closeFolderDropdown,
}) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: deleteFolder } = useDeleteFolder();

  // e.stopPropagation() prevents the click event from bubbling up to the parent

  const handleOk = async () => {
    await deleteFolder(id);
    toast({
      title: "Folder deleted",
      variant: "default",
    });
    refetch();
    closeFolderDropdown();
  };

  const handleCancel = () => {
    setOpen(false);
    closeFolderDropdown();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        onClick={(e) => {
          e.stopPropagation();
        }}
        asChild
      >
        <Button variant="destructive" size="icon">
          <Trash className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold">Delete folder?</h3>
        <p className="text-sm text-gray-500">This action cannot be undone.</p>
        <div className="p-4">
          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel} variant="outline" size="sm">
              No
            </Button>
            <Button onClick={handleOk} variant="destructive" size="sm">
              Yes
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
