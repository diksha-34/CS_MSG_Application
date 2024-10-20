import React, { useState } from 'react';
import API_URL from '../apiConfig';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
const navigate = useNavigate();

const handleAskQuestion = ()=>{
   navigate("/askQuestion")
}
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace with your API endpoint for login
    const api = `${API_URL}/api/agentLogin?username=${username}&password=${password}`;

    try {
      const response = await fetch(api, {
        method: 'POST',  // Keep it POST as per your backend API
        headers: {
          'Content-Type': 'application/json',
        }
      });
    
      if (response.ok) {
        // On success, redirect to dashboard or perform any other action
        console.log('Login successful');
        navigate("/dashboard")
        // window.location.href = '/dashboard'; // Example redirect
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Error logging in. Please try again.');
    }
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Login
          </button>
        </form>
        <h5 className="text-blue-400 cursor-pointer mt-2 " onClick={handleAskQuestion}>Ask a Question</h5>
      </div>
      
    </div>
</>
  );
};

export default Login;
