import { axiosClient } from "@/lib/axios";
import { useMutation } from "react-query";

type LoginUser = {
  email: string;
  password: string;
};

const loginUser = async ({ email, password }: LoginUser) => {
  try {
    const response = await axiosClient.post("/auth/login", {
      email,
      password,
    });

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to login");
    }

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const useLogin = () => {
  return useMutation(loginUser);
};
