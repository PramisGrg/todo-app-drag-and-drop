import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Droppable from "./droppable";
import Draggable from "./draggable";
import { useState } from "react";

interface Task {
  id: number;
  name: string;
  type: string;
}

const TodoContainer: React.FC = () => {
  const list = ["add Todo", "in Progress", "completed"];

  const todotasks: Task[] = [
    { id: 1, name: "Do exercise", type: "add Todo" },
    { id: 2, name: "Eat well", type: "add Todo" },
    { id: 3, name: "Do shower", type: "add Todo" },
    { id: 4, name: "Read Books", type: "add Todo" },
    { id: 5, name: "Sleep at 11 pm", type: "add Todo" },
  ];

  const [tasks, setTasks] = useState<Task[]>([...todotasks]);

  const onDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (over && active) {
      setTasks(
        tasks.map((item) => {
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
  console.log(tasks);

  const getTasks = (type: string): Task[] => {
    return tasks.filter((item) => item.type === type);
  };

  console.log(getTasks);

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
    <DndContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-10">
        {list.map((item) => (
          <Droppable id={item} key={item}>
            <h1 className="py-6 text-xl">{item}</h1>
            <div className="space-y-4">
              {getTasks(item).map((task) => (
                <Draggable id={task.id} key={task.id}>
                  <div className={`p-4 rounded-md ${getTaskColor(task.type)}`}>
                    {task.name}
                  </div>
                </Draggable>
              ))}
            </div>
          </Droppable>
        ))}
      </div>
    </DndContext>
  );
};

export default TodoContainer;
