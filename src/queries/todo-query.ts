import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosAuthInstance } from "@/services/axios";

interface Todo {
  id: string;
  status: string;
}

interface TodoData {
  data: Todo[];
}

export const useGetTodoQuery = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axiosAuthInstance.get("/todo/get");
      return response.data;
    },
  });
};

export const useCreateTodoQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todo: string) => {
      const response = await axiosAuthInstance.post("/todo/create", {
        addTodo: todo,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useUpdateTodoQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: Todo) => {
      const response = await axiosAuthInstance.patch(
        `/todo/update/${params.id}`,
        { status: params.status }
      );
      return response.data;
    },

    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (old: TodoData) => {
        return {
          ...old,
          data: old.data.map((todo: Todo) =>
            todo.id === newTodo.id ? { ...todo, status: newTodo.status } : todo
          ),
        };
      });

      return { previousTodos };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
