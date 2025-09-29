import React from 'react'
import TodoItems from './TodoItems'; 

export default function todo(props) {
  
  return (
    <div className="container-todo">
      <h3 className='text-center my-3'>Todos List</h3>
      {props.todos.map((todo,index)=>{
        return <TodoItems todos={todo} index={index} key={todo.sno} ONDelete={props.ONDelete}>
        </TodoItems>
      })}
    </div>
  )
}
