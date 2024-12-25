import { axiosInstance } from "@/services/axios";
import { useMutation } from "@tanstack/react-query";
import { RegisterType, LoginType } from "@/types/type";

export const useRegisterQuery = () => {
  return useMutation({
    mutationFn: async (data: RegisterType) => {
      const response = await axiosInstance.post("/auth/register", data);
      return response.data;
    },
  });
};

export const useLoginQuery = () => {
  return useMutation({
    mutationFn: async (data: LoginType) => {
      const response = await axiosInstance.post("/auth/login", data);
      return response.data;
    },
  });
};
