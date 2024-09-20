// src/services/authService.js

import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';  // Update to match your Django server URL

function login(username, password) {
  return axios.post(`${API_URL}login/`, { username, password })
    .then(response => {
      if (response.data.token) { 
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      console.log(response.data)
      return response.data;
    });
}

function logout() {
  localStorage.removeItem('user');
  return axios.post(`${API_URL}logout/`);
}

export default {
  login,
  logout
};
