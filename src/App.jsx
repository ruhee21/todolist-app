import './App.css';
import React, { useState, useEffect} from "react";
import TodoForm from './components/todoform';
import TodoList from './components/todoList';
import { filterNameFromURL } from './utils/locationUtils';


function App() {
const [todos, setTodos] = useState([]);
const key = todos.id;

useEffect(() => {
  const data = localStorage.getItem(key)
  if (data) {
    setTodos(JSON.parse(data));
  }
}, []);

useEffect(() =>{
localStorage.setItem(key, JSON.stringify(todos))

}, [todos]);

const filterFromUrl = filterNameFromURL();
const [filter, setFilter] = useState(filterFromUrl);

function addTodo(todo){
  setTodos([todo, ...todos]);
}
function editTodo(id) {
  let newTodos = [...todos];
  newTodos = newTodos.map(todo => {
    if(todo.id===id) {
      return {
        ...todo,
        isEditing: true,
      }
    } else {
      return {
        ...todo,
        isEditing: false,
      }
    }
  });
  setTodos(newTodos);
}

function updateTodo(id, updatedTitle) {
  let newTodos = [...todos];
  newTodos = newTodos.map(todo => {
    if(todo.id===id) {
      return {
        ...todo,
        title: updatedTitle,
      }
    } else {
      return {
        ...todo,
      }
    }
  });
  setTodos(newTodos);
}

function closeEditView() {

  let newTodos = [...todos]
  setTodos(newTodos.map(todo=> ({
    ...todo,
    isEditing: false})));
}

function removeTodo(id) {
  const newTodos = [...todos].filter(todo => todo.id !== id);
  setTodos(newTodos);
}

function toggleComplete(id){
  setTodos(
    todos.map(todo => {
      if (todo.id == id){
        return{
          ...todo,
          isCompleted: !todo.isCompleted,
        }
      }
      return todo;
    })
  )
}

function toggleAll(id) {
  // 1. check if any of the todo is checked?
  // 2. if any unchecked make all checkbox checked
  // 3. if all checked make all checkbox unchecked
  setTodos(
    todos.map(todo => {
      if (filter === "active"){
      }
      if (todo.isCompleted){
        return{
          ...todo,
          isCompleted: false,
        }
      } else{
        return{
          ...todo,
          isCompleted: true, 
        }
      }
    })
  )
  }

  function filterSelection (todoToshow) {
    setFilter(todoToshow);
  }

  function filterTodo() {
    if (filter === "active") {
      return [...todos].filter(todo => !todo.isCompleted)
    } else if (filter === "complete") {
      return [...todos].filter(todo => todo.isCompleted)
    } else {
      return [...todos];
    }
  }

  const filteredTodo = filterTodo();

  let itemsLeft = [...todos].filter(todo => !todo.isCompleted)
  
  function numItems(){
    let numItems= "item";

  if (itemsLeft.length > 1){
      return numItems.concat('s');
    } else {
      return numItems
    }
  }

  const numItemsLeft = numItems();

  function clearItems(){
    setTodos([...todos].filter(todo => !todo.isCompleted))
  }

  return (
    <section className="todoapp">
      <div>
        <header className="header">
          <h1>todos</h1>
        </header>
        <TodoForm addTodo = {addTodo}></TodoForm>
        <section className="main">
          <input id="toggle-all" 
                class="toggle-all" type="checkbox" 
                onClick={toggleAll} 
          />
          <label htmlFor="toggle-all"></label>
          <ul className="todo-list" >
            <TodoList 
              todos={filteredTodo} 
              toggleComplete={toggleComplete} 
              editTodo={editTodo} 
              removeTodo={removeTodo}
              updateTodo={updateTodo}
              closeEditView={closeEditView}
            />
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>{itemsLeft.length}</strong>
            <span></span>
            <span> {numItemsLeft} </span>
            <span> left </span>
          </span>
          <ul className="filters">
            <li><a href="#/" className={filter==="all" ? "selected": ""} onClick={() => filterSelection('all')}>All</a></li>
            <span></span>
            <li><a href="#/active" className={filter==="active" ? "selected": ""} onClick={() => filterSelection('active')}>Active</a></li>
            <span> </span>
            <li><a href="#/complete" className={filter==="complete" ? "selected": ""} onClick={() => filterSelection('complete')}>Completed</a></li>
          </ul>
          {[...todos].some(todo => todo.isCompleted) ? (
          <button class="clear-completed" onClick={clearItems}>Clear completed</button>
          ): null}
          </footer>
      </div>
    </section> 
  )
  
  }
export default App;
