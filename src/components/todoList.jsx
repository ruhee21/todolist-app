import React from 'react';
import Todo from './todo'; 

function TodoList({todos, toggleComplete, removeTodo, editTodo, updateTodo, closeEditView}){

    return(
        <>
            {todos.map(todo => 
                <Todo key={todo.id}     
                    todo={todo} 
                    toggleComplete={toggleComplete}
                    removeTodo = {removeTodo} 
                    editTodo={editTodo}
                    updateTodo={updateTodo}
                    closeEditView={closeEditView}
                />         
        )}
        </>
        
    )

}


export default TodoList;