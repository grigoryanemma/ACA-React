import { useReducer, useRef, useState } from "react";
import "./TodoList.css";
import { TODO_ACTION_TYPES } from "../../actionTypes/todoActionTypes";

const defaultTodoList = [
  { id: 1, name: "Todo 1", isRed: false, isInEditMode: false },
  { id: 2, name: "Todo 2", isRed: false, isInEditMode: false },
  { id: 3, name: "Todo 3", isRed: false, isInEditMode: false },
];

const reducerWithoutSwitch = (todos, action) => {
  const reducers = {
    [TODO_ACTION_TYPES.AddTodo]: () =>
      todos.concat({ id: Math.random(), name: action.name }),

    [TODO_ACTION_TYPES.DeleteTodo]: () =>
      todos.filter((todo) => todo.id !== action.id),

    [TODO_ACTION_TYPES.MarkAsDone]: () => {
      const clonedTodos = [...todos];
      clonedTodos.splice(action.i, 1, { ...action.todo, isRed: true });

      return clonedTodos;
    },

    [TODO_ACTION_TYPES.EditTodo]: () => {
      const clonedTodos = [...todos];
      clonedTodos.splice(action.i, 1, { ...action.todo, isInEditMode: true });

      return clonedTodos;
    },

    [TODO_ACTION_TYPES.CancelEditMode]: () => {
      const clonedTodos = [...todos];
      clonedTodos.splice(action.i, 1, {
        ...action.todo,
        isInEditMode: false,
        isRed: false,
      });

      return clonedTodos;
    },

    [TODO_ACTION_TYPES.UpdateEditModeInput]: () => {
      const clonedTodos = [...todos];
      clonedTodos.splice(action.i, 1, {
        ...action.todo,
        isInEditMode: false,
        isRed: false,
      });

      return clonedTodos;
    },

    [TODO_ACTION_TYPES.HandleEditModeInputValue]: () => {
      const clonedTodos = [...todos];
      clonedTodos.splice(action.i, 1, { ...action.todo, name: action.name });

      return clonedTodos;
    },
  };

  const reducerHandler = reducers[action.type] || (() => todos);

  return reducerHandler();
};

const reducer = (todos, action) => {
  switch (
    action.type // without switch   // instructions/add
  ) {
    case TODO_ACTION_TYPES.AddTodo: {
      return todos.concat({ id: Math.random(), name: action.name });
    }

    case TODO_ACTION_TYPES.DeleteTodo: {
      return todos.filter((todo) => todo.id !== action.id);
    }

    case TODO_ACTION_TYPES.MarkAsDone: {
      const clonedTodos = [...todos];
      clonedTodos.splice(action.i, 1, { ...action.todo, isRed: true });

      return clonedTodos;
    }

    case TODO_ACTION_TYPES.EditTodo: {
      const clonedTodos = [...todos];
      clonedTodos.splice(action.i, 1, { ...action.todo, isInEditMode: true });

      return clonedTodos;
    }

    case TODO_ACTION_TYPES.CancelEditMode: {
      const clonedTodos = [...todos];
      clonedTodos.splice(action.i, 1, {
        ...action.todo,
        isInEditMode: false,
        isRed: false,
      });

      return clonedTodos;
    }

    case TODO_ACTION_TYPES.UpdateEditModeInput: {
      const clonedTodos = [...todos];
      clonedTodos.splice(action.i, 1, {
        ...action.todo,
        isInEditMode: false,
        isRed: false,
      });

      return clonedTodos;
    }

    case TODO_ACTION_TYPES.HandleEditModeInputValue: {
      const clonedTodos = [...todos];
      clonedTodos.splice(action.i, 1, { ...action.todo, name: action.name });

      return clonedTodos;
    }

    default:
      return todos;
  }
};

export const TodoListWithReducer = () => {
  const [inputValue, setInputValue] = useState("");
  const [todoList, dispatch] = useReducer(
    reducerWithoutSwitch,
    defaultTodoList
  );
  const clickRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTodo = () => {
    dispatch({ type: TODO_ACTION_TYPES.AddTodo, name: inputValue });
    setInputValue("");
  };

  const deleteTodo = (id) => {
    dispatch({ type: TODO_ACTION_TYPES.DeleteTodo, id: id });
  };

  const markTodo = (todo, i) => {
    if (!clickRef.current) {
      clickRef.current = setTimeout(() => {
        dispatch({ type: TODO_ACTION_TYPES.MarkAsDone, todo: todo, i: i });

        clickRef.current = null;
      }, 200);
    }
  };

  const editItem = (todo, i) => {
    clearTimeout(clickRef.current);
    clickRef.current = null;

    dispatch({ type: TODO_ACTION_TYPES.EditTodo, todo: todo, i: i });
  };

  const handleEditModeInputValue = (e, todo, i) => {
    dispatch({
      type: TODO_ACTION_TYPES.HandleEditModeInputValue,
      todo: todo,
      i: i,
      name: e.target.value,
    });
  };

  const cancelEditMode = (todo, i) => {
    dispatch({ type: TODO_ACTION_TYPES.CancelEditMode, todo: todo, i: i });
  };

  const updateEditModeInputValue = (todo, i) => {
    dispatch({ type: TODO_ACTION_TYPES.UpdateEditModeInput, todo: todo, i: i });
  };

  return (
    <>
      <input value={inputValue} onChange={handleInputChange} />
      <button onClick={addTodo}>Add</button>
      {todoList.map((item, i) => {
        return (
          <>
            <div>
              {item.isInEditMode ? (
                <>
                  <input
                    value={item.name}
                    onChange={(e) => {
                      handleEditModeInputValue(e, item, i);
                    }}
                  />
                  <button
                    onClick={() => {
                      updateEditModeInputValue(item, i);
                    }}
                  >
                    update
                  </button>
                  <button
                    onClick={() => {
                      cancelEditMode(item, i);
                    }}
                  >
                    cancel
                  </button>
                </>
              ) : (
                <li
                  key={item.id}
                  onClick={() => markTodo(item, i)}
                  onDoubleClick={() => {
                    editItem(item, i);
                  }}
                  className={item.isRed ? "red" : ""}
                >
                  {item.name}
                </li>
              )}
            </div>
            <button
              onClick={() => {
                deleteTodo(item.id);
              }}
            >
              delete
            </button>
          </>
        );
      })}
    </>
  );
};
