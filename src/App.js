import { useState } from "react";
import "./App.css";
import Counter, { App2 } from "./app/components/counters/Counter";
import { TodoList } from "./app/components/todoLists/TodoList";
import { UserList } from "./app/components/users/UserList";
import { TaskList } from "./app/components/tasks/TaskList";
import { TodoListWithReducer } from "./app/components/todoLists/TodoListWithReducer";

function App() {
  const [counterName, setCounterName] = useState("First Counter");
  return (
    <>
      {/* <Counter counterName={counterName} setCounterName={setCounterName} /> */}
      {/* <Counter counterName="Second Counter" /> */}
      {/* <TodoList /> */}
      {/* <TodoListWithReducer /> */}
      {/* <UserList /> */}
      <TaskList />
    </>
  );
}

export default App;
