import { useState } from "react";

const Counter = ({ counterName, setCounterName }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((count) => count + 1);
  };

  const decrement = () => {
    setCount((count) => count - 1);
  };

  const counterNameChangeHandler = () => {
    setCounterName("New Name");
  };

  return (
    <div>
      <h1>{counterName}</h1>
      <button onClick={counterNameChangeHandler}>Change Name</button>
      <button onClick={increment}>+</button>
      <div>Count {count}</div>
      <button onClick={decrement}>-</button>
    </div>
  );
};

export default Counter;
