import { axiosInstance } from "@/services/axios";
import { useMutation } from "@tanstack/react-query";

interface RegisterType {
  name: string;
  email: string;
  password: string;
}

export const useRegisterQuery = () => {
  return useMutation({
    mutationFn: async (data: RegisterType) => {
      const response = await axiosInstance.post("/auth/register", data);
      return response.data;
    },
  });
};
