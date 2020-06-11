import React from 'react';
import classNames from 'classnames';

function Todo ({todo, toggleComplete, editTodo, updateTodo, removeTodo, closeEditView}){

    function handleCheckboxClick(){
        toggleComplete(todo.id);
    }

    function removeText(){
        removeTodo(todo.id);
    }

    function editText() {
        editTodo(todo.id);
    }

    function updateTitle(event) {
        const value = event.target.value;
        updateTodo(todo.id, value);
    }

    function onKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            closeEditView();
          }
    } 
    // Actions
    // 1. On double click show edit
    // 2. On enter iin input, close edit

    return (
        <li className={
            classNames({ 
                completed: todo.isCompleted, 
                editing: todo.isEditing 
            })}>
            <div className="view">
                <input  className="toggle" 
                        type="checkbox" 
                        checked={todo.isCompleted}
                        onClick={handleCheckboxClick} />
                <label onDoubleClick={editText}>{todo.title}</label>
                <button className="destroy"
                        onClick={removeText}></button>
            </div>
            <input className="edit" value={todo.title} onChange={updateTitle} onKeyDown={onKeyDown} />
        </li>)
}

export default Todo;