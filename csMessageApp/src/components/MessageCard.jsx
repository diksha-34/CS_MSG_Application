import React from 'react';

const MessageCard = ({ message, onSelect }) => {
    return (
        <div className="p-4 bg-white shadow-md mb-4 rounded-md cursor-pointer" onClick={onSelect}>
            <div className="font-bold text-gray-800">{message.userId}</div>
            <div className="text-sm text-gray-600">{message.text}...</div>
            <div className={`text-xs ${message.state === 'in-progress' ? 'text-yellow-500' : 'text-green-500'}`}>
                {message.state}
            </div>
        </div>
    );
};

export default MessageCard;
