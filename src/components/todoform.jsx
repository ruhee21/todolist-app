
import {useState} from 'react';
import React from 'react';
import { Utils } from "../utils/Utils";


function ToDoForm ({addTodo}){

  const [todo, setTodo] = useState({
      id: "",
      title: '',
      isCompleted: false,
      isEditing: false,  
  })

  function handleNewTodo(e) {
    setTodo({...todo, title: e.target.value});

  }   

  function handleSubmit(e){
    if (e.key === 'Enter') {
      e.preventDefault();
      if(todo.title.trim()) {
        addTodo({...todo, id: Utils.uuid()})
        setTodo({
          id: '',
          title: '',
          isCompleted: false,
          isEditing: false,
        })
      }
    }
  }

    return (
      <input className="new-todo" 
            placeholder="What needs to be done?" 
            value={todo.title} 
            onChange={handleNewTodo}
            onKeyDown={handleSubmit} />

    )
}
 
  export default ToDoForm;
 