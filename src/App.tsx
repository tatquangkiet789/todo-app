import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import './App.css';
import Todo from './components/Todo';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const todoNameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const LOCAL_STORAGE_KEY = "todo-app.Todos";

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!);
    if(storedTodos)
      setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    const name = todoNameRef.current.value;
    if(name === "")
      return;
    else {
      setTodos(prev => {
        return [...prev, {id: uuidv4(), name: name, complete: false}]
      })
      todoNameRef.current.value = "";
    }
  }

  const handleToogleTodo = (id: string) => {
    const newTodos = [...todos];
    const newTodo = newTodos.find(todo => todo.id === id);
    if(newTodo)
      newTodo.complete = !newTodo.complete;
    setTodos(newTodos);
  }

  const handleClearTodo = () => {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      {todos.map(todo => {
        return <Todo key={todo.id} todo={todo} toggleTodo={handleToogleTodo}/>
      })}
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodo}>Clear Completed Todo</button>
      <p>{todos.filter(todo => !todo.complete).length} to do left</p>
    </div>
  );
}

export default App;
