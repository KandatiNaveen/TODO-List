import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Board.css'; // Add styles for the board
import ToDoList from "./DragAndDrop/ToDoList";
export default function Board() {
  const location = useLocation();
  const { board } = location.state || {};
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: []
  });
  const [ToDo, setToDo] = useState([])

  useEffect(() => {
    if (board) {
      axios.get(`http://127.0.0.1:8000/api/tasks/${board.name}/`)
        .then(response => {
          const todo = [];
          const inProgress = [];
          const completed = [];
          const x = []
          let i=1;
          response.data.forEach(task => {
            let data = {}
            data["id"] = i
            data["text"] = task.title
            switch(task.status.toLowerCase()) {
              case 'pending':
                data["status"] = "to-do"
                todo.push(task);
                break;
              case 'to-do':
                data["status"] = "to-do"
                todo.push(task);
                break;
              case 'in progress':
                data["status"] = "in-progress"
                inProgress.push(task);
                break;
              case 'completed':
                data["status"] = "done"
                completed.push(task);
                break;
              default:
                todo.push(task);
                break;
            }
            x.push(data)
            i=i+1
          });

          setToDo(x)
          console.log(x)
          
          setTasks({
            todo,
            inProgress,
            completed
          });
        })
        .catch(error => {
          console.error("There was an error fetching the tasks!", error);
        });
    }
  }, []);

  if (!board) {
    return <p>No board selected</p>;
  }

  const temp = () =>{
    <div className="board-page">
      <h2>{board.name}</h2>
      <p>{board.des}</p>
      <div className="task-columns">
        <div className="task-column">
          <h3>To-Do's</h3>
          <div className="task-list">
            {tasks.todo.map(task => (
              <div key={task.title} className="task-card todo">
                <p>{task.title}</p>
                <small>{task.disp}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="task-column">
          <h3>In Progress</h3>
          <div className="task-list">
            {tasks.inProgress.map(task => (
              <div key={task.title} className="task-card in-progress">
                <p>{task.title}</p>
                <small>{task.disp}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="task-column">
          <h3>Completed</h3>
          <div className="task-list">
            {tasks.completed.map(task => (
              <div key={task.title} className="task-card completed">
                <p>{task.title}</p>
                <small>{task.disp}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  }

  return (
    <ToDoList
      todos={ToDo} setTodos = {setToDo} name = {board.name}
    />
  );
}
