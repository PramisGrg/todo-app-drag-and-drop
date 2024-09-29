import { DndContext } from "@dnd-kit/core";

const TodoContainer = () => {
  const todoItems = [
    { id: 1, name: "Learning React " },
    { id: 2, name: "Learning Express" },
    { id: 3, name: "Learning Postgres SQL" },
    { id: 4, name: "Learning Node js" },
  ];

  const onDragEnd = (e) => {
    console.log(e);
  };
  return (
    <DndContext onDragEnd={onDragEnd}>
      <div>
        {todoItems.map((item) => (
          <div key={item.id}>
            <div>{item.name}</div>
          </div>
        ))}
      </div>
    </DndContext>
  );
};

export default TodoContainer;
