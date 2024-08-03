import { axiosClient } from "@/lib/axios";
import { useMutation } from "react-query";

type RegisterUser = {
  name: string;
  email: string;
  password: string;
};

const registerUser = async ({ email, password, name }: RegisterUser) => {
  try {
    const response = await axiosClient.post("/auth/register", {
      email,
      password,
      name,
    });

    if (response.status !== 200) {
      throw new Error("Something went wrong!");
    }

    return true;
  } catch (error: any) {
    console.error(error);
    return false;
  }
};

export const useRegister = () => {
  return useMutation(registerUser);
};
