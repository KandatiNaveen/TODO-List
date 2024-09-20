import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'; // Create this CSS file for styling
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/boards/');
        setBoards(response.data); 
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };

    fetchBoards();
  }, []);

  const handleBoardClick = (board) => {
    navigate('/board', { state: { board } }); // Pass board data as state
  };

  const handlePlusClick = (board) => {
    navigate('/forms', { state: { board } }); // Pass board data as state
  };

  return (
    <div className="board-list-container">
      <h2>My WorkBoards</h2>
      <div className="board-list">
        <div className="board-card add-new" 
            style={{cursor:"pointer"}}
            onClick={() => handlePlusClick()} >
          <span>+</span>
        </div>
        {boards.map(board => (
          <div
            key={board.name}
            className="board-card"
            style={{cursor:"pointer"}}
            onClick={() => handleBoardClick(board)} // Handle click event
          >
            <h3>{board.name}</h3>
            <p>{board.des}</p>
            <p>1 Task</p> {/* Assuming a static number for now */}
            <div className="members">
              <span className="member">Y</span>
              <span className="member">A</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;