import TaskColumn from "./TaskColumn";
import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const ToDoList = ({ todos, setTodos, name}) => {
  const [newTodoText, setNewTodoText] = useState("");

  const updateTodoStatus = (draggedTodoId, droppedColumnTitle) => {
    const statusByColumn = {
      "To do": "to-do",
      "In progress": "in-progress",
      Done: "done",
    };

    setTodos(
      todos.map((todo) => {
        if (todo.id === draggedTodoId) {
          return {
            ...todo,
            status: statusByColumn[droppedColumnTitle],
          };
        } else {
          return todo;
        }
      })
    );
  };

  const deleteTodo = (draggedTodoId) => {
    setTodos(todos.filter((todo) => todo.id !== draggedTodoId));
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      // if user dropped the task outside any droppable area, return
      return;
    }
    const draggedTodoId = active.id;
    const droppedAreaId = over.id;
    if (droppedAreaId === "delete-task-area") {
      deleteTodo(active.id);
    } else {
      updateTodoStatus(draggedTodoId, droppedAreaId);
    }
  };

  const handleAddTodo = (e) => {
    e.preventDefault();

    // add the todo
    setTodos([
      ...todos,
      {
        id: uuid,
        text: newTodoText,
        status: "to-do",
      },
    ]);
    // clear the input
    setNewTodoText("");
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <h2 style={{ marginLeft: "10px" }}>{name}</h2>
      <div style={{ display: "flex", flexDirection: "row", justifyContent:"center", minHeight:"60vh"}}>
        <TaskColumn
          title="To do"
          todos={todos.filter((t) => t.status === "to-do")}
          board = {name}
          status = "To-DO"
        />
        <TaskColumn
          title="In progress"
          todos={todos.filter((t) => t.status === "in-progress")}
          board = {name}
          status = "In Progress"
        />
        <TaskColumn
          title="Done"
          todos={todos.filter((t) => t.status === "done")}
          board = {name}
          status = "Completed"
        />
      </div>
    </DndContext>
  );
};

export default ToDoList;
