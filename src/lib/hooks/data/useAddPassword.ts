import { toast } from "@/components/ui/use-toast";
import { useMutation } from "react-query";
import { axiosClient } from "../../axios";
import { Password } from "../../types";

type InputQuery = {
  passwordName: string;
  folderId: number | null;
  username: string;
  password: string;
  uri?: string | undefined;
  notes?: string | undefined;
};

const addPassword = async (password: InputQuery) => {
  try {
    const response = await axiosClient.post("/passwords", password);

    return response.data as Password;
  } catch (err: unknown) {
    if (err instanceof Error) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  }
};

export const useAddPassword = () => {
  return useMutation(addPassword);
};
