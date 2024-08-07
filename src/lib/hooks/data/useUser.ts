import { axiosClient } from "@/lib/axios";
import { User } from "@/lib/types";
import { useQuery } from "react-query";

const getUser = async (): Promise<User> => {
  try {
    const response = await axiosClient.get("/user");

    if (!response.data || response.status !== 200) {
      throw new Error("Could not fetch user");
    }

    return response.data as User;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const useUser = (isAuthenticated: boolean) => {
  return useQuery<User, Error>("user", getUser, {
    enabled: isAuthenticated,
  });
};
