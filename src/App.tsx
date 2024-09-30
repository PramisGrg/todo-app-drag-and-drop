import TodoContainer from "./components/todo-container";

function App() {
  return (
    <>
      <div className="p-20 space-y-6">
        <h1 className="text-3xl">Simple Todo App</h1>
        <div>
          <TodoContainer />
        </div>
      </div>
    </>
  );
}

export default App;
