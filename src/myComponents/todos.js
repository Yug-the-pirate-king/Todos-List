import React from 'react'
import TodoItems from './TodoItems';

// Renders the complete list of todos by mapping each todo to a TodoItems component.
export default function Todo(props) {
  // Guard against undefined/null or non-array values so .map() never throws.
  const todos = Array.isArray(props.todos) ? props.todos : [];
  const { ONDelete } = props;

  return (
    <div className="container-todo">
      <h3 className='text-center my-3'>Todos List</h3>

      {/* Render each todo item. The list stays empty when there are no todos. */}
      {todos.map((todoItem, index) => {
        // Use the unique serial number as the React key; fall back to the index
        // if the serial number is missing so React can still reconcile the list.
        return (
          <TodoItems
            todos={todoItem}
            index={index}
            key={todoItem.sno != null ? todoItem.sno : index}
            ONDelete={ONDelete}
          />
        );
      })}
    </div>
  )
}