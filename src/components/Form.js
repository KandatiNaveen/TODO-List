import React, { useState } from 'react';
import "./Form.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const navigate = useNavigate();
    const [board, setBoard] = useState({ name: '', description: '' });
    const [tasks, setTasks] = useState([]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...tasks];
        list[index][name] = value;
        setTasks(list);
    };

    const handleAddClick = () => {
        setTasks([...tasks, { title: '', description: '', assignee: '', status: 'To-Do' }]);
    };

    const handleBoardChange = (e) => {
        const { name, value } = e.target;
        setBoard({ ...board, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const boardRes = await axios.post("http://127.0.0.1:8000/api/boards/", {
                name: board.name,
                description: board.description
            });
            console.log(boardRes);

            const tasksResponses = tasks.map(task => {
                return axios.post('http://127.0.0.1:8000/api/tasks/', {
                    "board": board.name,
                    "title": task.title,
                    "description": task.description,
                    "status": task.status
                });
            });
            const results = await Promise.all(tasksResponses);
            results.forEach(response => console.log(response));

            navigate('/board', { state: { board } });
        } catch (error) {
            console.error("Failed to create board or tasks", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a WorkBoard</h2>
            <input type="text" name="name" value={board.name} onChange={handleBoardChange} placeholder="Name your Board" required />
            <textarea name="description" value={board.description} onChange={handleBoardChange} placeholder="Board description" />
            {tasks.map((x, i) => (
                <div key={i}>
                    <input name="title" placeholder="Task Title" value={x.title} onChange={e => handleInputChange(e, i)} required />
                    <textarea name="description" placeholder="Task Description (Optional)" value={x.description} onChange={e => handleInputChange(e, i)} />
                    <select name="status" value={x.status} onChange={e => handleInputChange(e, i)}>
                        <option value="To-Do">To-Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            ))}
            <button type="button" onClick={handleAddClick}>+ Add a Task</button>
            <button type="submit">Create Work Board</button>
        </form>
    );
};

export default Form;
