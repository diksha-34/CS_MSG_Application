import React, { useState } from 'react';

const MessageDetails = ({ message, onSendResponse }) => {
    const [response, setResponse] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSendResponse(response);
        setResponse('');
    };

    return (
        <div className="p-4">
            <div className="text-xl font-bold">UserId: {message.userId}</div>
            <div className="mt-2">{message.text}</div>
            <form onSubmit={handleSubmit} className="mt-4">
                <textarea
                    className="w-full p-2 border rounded-md"
                    rows="4"
                    placeholder="Type your response..."
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600"
                >
                    Send Response
                </button>
            </form>
        </div>
    );
};

export default MessageDetails;
