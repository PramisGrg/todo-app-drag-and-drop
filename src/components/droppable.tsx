import { useDroppable } from "@dnd-kit/core";
import React, { ReactNode } from "react";

interface DroppableProps {
  id: string;
  children: ReactNode;
}

const Droppable: React.FC<DroppableProps> = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id });
  return <div ref={setNodeRef}>{children}</div>;
};

export default Droppable;
