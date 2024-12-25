import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Droppable from "./droppable";
import Draggable from "./draggable";
import { useEffect, useState } from "react";
import AddTodoPopup from "./popup/add-todo-popup";
import {
  useCreateTodoQuery,
  useGetTodoQuery,
  useUpdateTodoQuery,
} from "@/queries/todo-query";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface Task {
  id: string;
  addTodo: string;
  status: string;
}

const TodoContainer: React.FC = () => {
  const status = ["ADD", "IN_PROGRESS", "COMPLETED"];

  const { data: todos } = useGetTodoQuery();
  const createTodo = useCreateTodoQuery();
  const updateTodo = useUpdateTodoQuery();
  const [getTodo, setGetTodo] = useState<Task[]>([]);

  useEffect(() => {
    if (todos?.data) {
      setGetTodo(todos.data);
    }
  }, [todos?.data]);

  const addTodo = (newTodo: string) => {
    // setGetTodo((prevTodos) => [
    //   ...prevTodos,
    //   {
    //     id: uuidv4(),
    //     addTodo: newTodo,
    //     status: "add Todo",
    //   },
    // ]);
    console.log(newTodo);
    createTodo.mutate(newTodo, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            toast.error(error.response.data.message || "Something went wrong!");
          } else {
            toast.error(error.message || "Something went wrong!");
          }
        } else {
          toast.error("An unexpected error occurred.");
        }
      },
    });
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (over && active) {
      // setGetTodo(
      //   getTodo.map((item) => {
      //     if (item.id === active.id) {
      //       return {
      //         ...item,
      //         type: over.id as string,
      //       };
      //     }
      //     return item;
      //   })
      // );
      console.log(over, active, "This is over and active 🥹🥹");
      updateTodo.mutate({
        status: String(over.id),
        id: String(active.id),
      });
    }
  };

  const getTasks = (status: string): Task[] => {
    return getTodo.filter((item) => item.status === status);
  };

  const getTaskColor = (status: string) => {
    if (status === "ADD") {
      return "bg-red-100";
    } else if (status === "IN_PROGRESS") {
      return "bg-blue-100";
    } else {
      return "bg-green-100";
    }
  };

  return (
    <>
      <div>
        <AddTodoPopup addTodo={addTodo} />
      </div>
      <DndContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-10">
          {status.map((item) => (
            <Droppable id={item} key={item}>
              <h1 className="py-6 text-xl">{item}</h1>
              <div className="space-y-8 min-h-[500px] p-4 rounded-md border bg-accent">
                {getTasks(item).map((task) => (
                  <Draggable id={task.id} key={task.id}>
                    <div
                      className={`p-4 rounded-md ${getTaskColor(task.status)}`}
                    >
                      {task.addTodo}
                    </div>
                  </Draggable>
                ))}
              </div>
            </Droppable>
          ))}
        </div>
      </DndContext>
    </>
  );
};

export default TodoContainer;
