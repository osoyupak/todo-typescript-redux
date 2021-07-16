import React, {useState} from 'react';
import './App.css';

interface ITodo {
  text: string;
  completed: boolean;
}

function App():JSX.Element {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  }

  const addTodo = (text:string) => {
    const newTodoList:ITodo[] = [...todos, {text, completed: false}]
    setTodos(newTodoList)
  }

  const handleComplete = (index:number) => {
    const newTodoList = [...todos];
    newTodoList[index].completed = !newTodoList[index].completed;
    setTodos(newTodoList); 
  }

  const removeTodo = (index:number):void => {
    const newTodoList = [...todos];
    newTodoList.splice(index,1);
    setTodos(newTodoList); 
  }

  return (
    <div className="app">
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={value} 
          onChange={e => setValue(e.target.value)}
        />  
        <button type="submit">Add Todo</button>
      </form>
      <section>
        {todos.map((todo:ITodo, index:number)=> {
          return (
          <React.Fragment key={index}>
             <div>{todo.text}</div>
             <button onClick={()=>handleComplete(index)}>{todo.completed?"Completed":"Incomplete"}</button>
             {todo.completed? <button onClick={()=>removeTodo(index)}>Remove</button>:null}
          </React.Fragment>
          ) 
          
        })}
      </section>
    </div>
  );
}

export default App;
