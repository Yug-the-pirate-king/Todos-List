import React from 'react'
import Card from 'react-bootstrap/Card';

export default function TodoItems({todos,index,ONDelete}) {
    const borderColors = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "dark",
    "light",
  ];
  return (
    <div>
        <Card border={borderColors[index]} style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{todos.title}</Card.Title>
          <Card.Text>
           {todos.desc}
           <br />
           <button className="btn btn-sm btn-danger my-3" onclick={}>Delete</button>
          </Card.Text>
        </Card.Body>
      </Card>
      <br />
    </div>
  )
}
