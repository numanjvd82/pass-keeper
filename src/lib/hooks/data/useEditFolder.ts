import { toast } from "@/components/ui/use-toast";
import {} from "@/lib/utils";
import { useMutation } from "react-query";
import { axiosClient } from "../../axios";
import { Folder } from "../../types";

const editFolder = async ({ id, name }: { id: number; name: string }) => {
  try {
    const response = await axiosClient.patch(`/folders/${id}`, {
      name,
    });

    return response.data as Folder;
  } catch (err: unknown) {
    if (err instanceof Error) {
      toast({
        title: "Error",
        description: "Failed to edit folder",
        variant: "destructive",
      });
    }
  }
};

export const useEditFolder = () => {
  return useMutation(editFolder);
};
