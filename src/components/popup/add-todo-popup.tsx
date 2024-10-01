import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface AddTodoPopupProps {
  addTodo: (newTodo: string) => void;
}
const AddTodoPopup = ({ addTodo }: AddTodoPopupProps) => {
  const [todo, setTodo] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleSubmit = () => {
    setIsDialogOpen(false);
    addTodo(todo);
    setTodo("");
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Todo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add todo here</DialogTitle>
          <DialogDescription>
            Change to your todo here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input
            name="todo"
            value={todo}
            onChange={handleChange}
            id="username"
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Add Todo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoPopup;
