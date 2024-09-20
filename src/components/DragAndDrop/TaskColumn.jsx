import React, { useState } from 'react';
import Card from "./Card";
import { useDroppable } from "@dnd-kit/core";
import axios from 'axios';
const TaskColumn = ({ title, todos, board, status }) => {
  const { isOver, setNodeRef } = useDroppable({ id: title });
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await axios.post('http://127.0.0.1:8000/api/tasks/', {
      "board": board,
      "title": newTask.title,
      "disp": newTask.description,
      "status": status
  });
  todos.push({
    "id": Math.floor(Math.random() * (10000 - 100 + 1)) + 100,
    "text" : newTask.title,
    "status": status
  })
    setNewTask({ title: '', description: '' });
    setShowForm(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        border: "1px solid gray",
        padding: "0 10px 10px 10px",
        margin: "10px",
        minWidth: "28vw",
        backgroundColor: isOver ? "lavender" : "transparent",
      }}
    >
      <h3>{title}</h3>
      <div>
        {todos.map((todo) => (
          <Card key={todo.id} todo={todo} />
        ))}
        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleFormChange}
              placeholder="Task Title"
              required
            />
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleFormChange}
              placeholder="Task Description"
              required
            />
            <button type="submit">Submit</button>
          </form>
        )}
        <button onClick={() => setShowForm(!showForm)} style={{ marginTop: '10px' }}>
          {showForm ? '-' : '+'}
        </button>
      </div>
    </div>
  );
};

export default TaskColumn;
