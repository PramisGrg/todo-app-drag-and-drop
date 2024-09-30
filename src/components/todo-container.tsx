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
    { id: 1, name: "Learning JS", type: "add Todo" },
    { id: 2, name: "Learning React.js", type: "add Todo" },
    { id: 3, name: "Learning Express.js", type: "add Todo" },
    { id: 4, name: "Learning MongoDB", type: "add Todo" },
    { id: 5, name: "Becoming a fullstack developer", type: "add Todo" },
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

  const getTasks = (type: string) => tasks.filter((item) => item.type === type);

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-10">
        {list.map((item) => (
          <Droppable id={item} key={item}>
            <h1 className="py-6 text-xl">{item}</h1>
            <div className="space-y-4">
              {getTasks(item).map((task) => (
                <Draggable id={task.id} key={task.id}>
                  {task.name}
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
