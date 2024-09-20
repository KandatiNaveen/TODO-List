import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Form from './components/Form';
import Board from './components/Board';
import Login from './components/Login';
import Header from './components/Header';

function App() {

  const checkAuth = () => {
    const user = localStorage.getItem('user');
    return user !== null;
  };

  const ProtectedRoute = ({ children }) => {
    if (!checkAuth()) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };


  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/forms" element={<Form/>} />
        <Route path="/board" element={<Board/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
