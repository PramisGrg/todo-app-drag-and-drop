import TodoContainer from "./components/todo-container";

function App() {
  return (
    <>
      <div className="p-20 space-y-6">
        <h1>Todo App</h1>
        <div>
          <TodoContainer />
        </div>
      </div>
    </>
  );
}

export default App;
