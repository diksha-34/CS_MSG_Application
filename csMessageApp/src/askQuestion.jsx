import React, { useState } from 'react';
import Header from './components/Header';

const AskQuestion = ({ initialUserId }) => {
  const [text, setQuestion] = useState('');
  const [status, setStatus] = useState('');
  const [userId, setUserId] = useState(initialUserId || '');
  const [responses, setResponses] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_URL = `http://localhost:8080/api/askQuestion`;

    try {
      const timeStamp = new Date().toISOString();
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, text, timeStamp }),
      });

      if (response.ok) {
        setStatus('Question submitted successfully!');
        alert("Question  submitted successfully!");

        setQuestion('');
      } else {
        setStatus('Failed to submit question.');
      }
    } catch (error) {
      setStatus('Error submitting question.');
    }
  };

  const handleFetchResponses = async () => {
    if (!userId) {
      setStatus('Please enter a User ID to view responses.');
      return;
    }

    const API_URL = `http://localhost:8080/api/getAllResponses?userId=${userId}`;

    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setResponses(data); // Store the responses
        setStatus('');
      } else {
        setStatus('Failed to fetch responses.');
      }
    } catch (error) {
      setStatus('Error fetching responses.');
    }
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Ask a Question</h2>
        {status && <p className="text-center mb-4">{status}</p>}
        <form onSubmit={handleSubmit}>
          {/* User ID Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userId">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          {/* Question Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question">
              Your Question
            </label>
            <textarea
              id="question"
              name="question"
              value={text}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit Question
          </button>
        </form>

        {/* Button to Fetch Responses */}
        <div className="mt-6">
          <button
            onClick={handleFetchResponses}
            className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300"
          >
            View Responses
          </button>
        </div>

        {/* Display Responses */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-center mb-4">Your Responses</h3>
          {responses.length > 0 ? (
            <ul className="list-disc pl-5">
              {responses.map((response, index) => (
                <li key={index} className="mb-2">
                  <strong>Response {index + 1}:</strong> {response}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No responses yet.</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
  
};

export default AskQuestion;
