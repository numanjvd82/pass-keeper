import { toast } from "@/components/ui/use-toast";
import {} from "@/lib/utils";
import { useMutation } from "react-query";
import { axiosClient } from "../../axios";
import { Folder } from "../../types";

const addFolder = async (name: string) => {
  try {
    const response = await axiosClient.post("/folders", {
      name,
    });

    return response.data as Folder;
  } catch (err: unknown) {
    if (err instanceof Error) {
      toast({
        title: "Error",
        description: "Failed to add folder",
        variant: "destructive",
      });
    }
  }
};

export const useAddFolder = () => {
  return useMutation(addFolder);
};
