import { toast } from "@/components/ui/use-toast";
import {} from "@/lib/utils";
import { useQuery } from "react-query";
import { axiosClient } from "../axios";
import { Password } from "../types";

type Query = {
  filter: {
    search?: string;
    folder?: string;
  };
};

export const usePasswords = (query: Query) => {
  const fetchPasswords = async () => {
    try {
      const response = await axiosClient.get("/passwords", {
        params: query.filter,
      });

      return response.data as Password[];
    } catch (err: any) {
      toast({
        title: "Error",
        description: "An error occurred while fetching passwords.",
        variant: "destructive",
      });
    }
  };

  const { data, isLoading, error, refetch } = useQuery(
    ["passwords", query.filter],
    () => fetchPasswords()
  );

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
