import React from 'react';
import './Card.css';

const Card = ({ task }) => {
  return (
    <div className="task-content">
      <p>{task.title}</p>
      <small>{task.disp}</small>
    </div>
  );
}

export default Card;
