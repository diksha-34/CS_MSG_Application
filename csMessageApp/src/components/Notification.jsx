import React from 'react';

const Notification = ({ message }) => {
    return (
        <div className="fixed top-0 left-0 w-full bg-green-500 text-white p-4">
            {message}
        </div>
    );
};

export default Notification;
