import { toast } from "@/components/ui/use-toast";
import {} from "@/lib/utils";
import { useQuery } from "react-query";
import { axiosClient } from "../axios";
import { Password } from "../types";

type Query = {
  filter: {
    search: string | undefined;
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
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const { data, isLoading, error, refetch } = useQuery(
    "passwords",
    fetchPasswords
  );

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
