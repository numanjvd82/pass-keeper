import { toast } from "@/components/ui/use-toast";
import { useMutation } from "react-query";
import { axiosClient } from "../../axios";
import { Folder } from "../../types";

const deleteFolder = async (id: number) => {
  try {
    const response = await axiosClient.delete(`/folders/${id}`);

    return response.data as Folder;
  } catch (err: unknown) {
    if (err instanceof Error) {
      toast({
        title: "Error",
        description: "Failed to delete folder",
        variant: "destructive",
      });
    }
  }
};

export const useDeleteFolder = () => {
  return useMutation(deleteFolder);
};
