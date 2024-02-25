import { useRef, useState } from "react";
import './TodoList.css';

const defaultTodoList = [
    {id: 1, name: "Todo 1", isRed: false, isInEditMode: false},
    {id: 2, name: "Todo 2", isRed: false, isInEditMode: false},
    {id: 3, name: "Todo 3", isRed: false, isInEditMode: false},
];


export const TodoList = () => {
    const [inputValue, setInputValue] = useState("");
    const [todoList, setTodoList] = useState(defaultTodoList);
    const clickRef = useRef(null);

    const handleInputChange = e => {
        setInputValue(e.target.value);
    };

    const addTodo = () => {
        setTodoList(currTodos => [...currTodos, {id: Math.random(), name: inputValue}]);
        setInputValue("");
    };

    const deleteTodo = (id) => {
        setTodoList(todos => todos.filter(todo => todo.id !== id));
    };

    const markTodo = (todo, i) => {
        if (!clickRef.current) {
            clickRef.current = setTimeout(() => {
                setTodoList(todos => {
                    const clonedTodos  = [...todos];
                    clonedTodos.splice(i, 1, {...todo, isRed: true});
        
                    return clonedTodos;
                });

                clickRef.current = null;
              }, 200);         
        }
        
    };

    const editItem = (todo, i) => {
        clearTimeout(clickRef.current);
        clickRef.current = null;

        setTodoList(todos => {
            const clonedTodos  = [...todos];
            clonedTodos.splice(i, 1, {...todo, isInEditMode: true});

            return clonedTodos;
        });
    };

    const handleEditModeInputValue = (e, todo, i) => {      
        setTodoList(todos => {
            const clonedTodos  = [...todos];
            clonedTodos.splice(i, 1, {...todo, name: e.target.value });

            return clonedTodos;
        });
    };

    const cancelEditMode = (todo, i) => {
        setTodoList(todos => {
            const clonedTodos  = [...todos];
            clonedTodos.splice(i, 1, {...todo, isInEditMode: false, isRed: false});

            return clonedTodos;
        });
    };

    const updateEditModeInputValue = (todo, i) => {
        setTodoList(todos => {
            const clonedTodos = [...todos];
            clonedTodos.splice(i, 1, {...todo, isInEditMode: false, isRed: false, });

            return clonedTodos;
        });
    };

    const handleClick = () => {
        console.log(clickRef.current);
  
        if (!clickRef.current) {
            clickRef.current = requestAnimationFrame(() => {
                console.log("setTimeout");
                clickRef.current = null;
            });
        }
    };

    const handleDoubleClick = () => {
        console.log("double");
        cancelAnimationFrame(clickRef.current);
        clickRef.current = null;
    };

    return (
        <>
            <input value={inputValue} onChange={handleInputChange} />
            <button onClick={addTodo}>Add</button>
            {
                todoList.map((item, i) => {
                    return (
                        <>
                        
                            <div>
                                {item.isInEditMode ? 
                                <>
                                    <input value={item.name} onChange={(e) => { handleEditModeInputValue(e, item, i)} }/>
                                    <button onClick={() => { updateEditModeInputValue(item, i)}}>update</button>
                                    <button onClick={() => { cancelEditMode(item, i) }}>cancel</button>
                                </>
                                    : <li key={item.id} onClick={() => markTodo(item, i) } onDoubleClick={() => { editItem(item, i) }} className={item.isRed ? "red" : ""}>{item.name}</li>
                                }
                            </div>
                            <button onClick={() => { deleteTodo(item.id) }}>delete</button>                   
                        </>      
                    );
                })
            }
            <button onClick={handleClick} onDoubleClick={handleDoubleClick}>click</button>
        </>
    );
};