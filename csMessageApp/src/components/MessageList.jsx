import React from 'react';
import MessageCard from './MessageCard';

const MessageList = ({ messages, onSelectMessage }) => {
    return (
        <div className="p-4">
            {messages.map((message) => (
                <MessageCard key={message.id} message={message} onSelect={() => onSelectMessage(message)} />
            ))}
        </div>
    );
};

export default MessageList;
