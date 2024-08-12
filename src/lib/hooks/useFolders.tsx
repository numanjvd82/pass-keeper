import { toast } from "@/components/ui/use-toast";
import {} from "@/lib/utils";
import { useQuery } from "react-query";
import { axiosClient } from "../axios";
import { Folder } from "../types";

export const useFolders = () => {
  const fetchFolders = async () => {
    try {
      const response = await axiosClient.get("/folders");

      return response.data as Folder[];
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: "Error",
          description: "Failed to fetch folders",
          variant: "destructive",
        });
      }
    }
  };

  const { data, isLoading, error, refetch } = useQuery("folders", () =>
    fetchFolders()
  );

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
