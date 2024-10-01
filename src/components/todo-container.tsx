import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Droppable from "./droppable";
import Draggable from "./draggable";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddTodoPopup from "./popup/add-todo-popup";

interface Task {
  id: string;
  name: string;
  type: string;
}

const TodoContainer: React.FC = () => {
  const list = ["add Todo", "in Progress", "completed"];

  const [todos, setTodos] = useState<Task[]>([]);

  const addTodo = (newTodo: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: uuidv4(),
        name: newTodo,
        type: "add Todo",
      },
    ]);
  };

  console.log("Todos🥹", todos);

  const onDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (over && active) {
      setTodos(
        todos.map((item) => {
          if (item.id === active.id) {
            return {
              ...item,
              type: over.id as string,
            };
          }
          return item;
        })
      );
    }
  };

  const getTasks = (type: string): Task[] => {
    return todos.filter((item) => item.type === type);
  };

  const getTaskColor = (type: string) => {
    if (type === "add Todo") {
      return "bg-red-100";
    } else if (type === "in Progress") {
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
          {list.map((item) => (
            <Droppable id={item} key={item}>
              <h1 className="py-6 text-xl">{item}</h1>
              <div className="space-y-4">
                {getTasks(item).map((task) => (
                  <Draggable id={task.id} key={task.id}>
                    <div
                      className={`p-4 rounded-md ${getTaskColor(task.type)}`}
                    >
                      {task.name}
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
