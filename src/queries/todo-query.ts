import { axiosAuthInstance } from "@/services/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateTodoQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (addTodo: string) => {
      const response = await axiosAuthInstance.post("/todo/create", {
        addTodo,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useGetTodoQuery = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axiosAuthInstance.get("/todo/get");
      return response.data;
    },
  });
};
