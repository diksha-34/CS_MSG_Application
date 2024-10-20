import React, { useState, useEffect } from 'react';
import MessageList from './components/MessageList';
import MessageDetails from './components/MessageDetails';
import Notification from './components/Notification';
import API_URL from '../apiConfig';
import Header from './components/Header';

const Dashboard = () => {
    const [messages, setMessages] = useState([]); 
    const [selectedMessage, setSelectedMessage] = useState(null); // To hold the currently selected message
    const [notification, setNotification] = useState(''); 

    
  

    useEffect(() => {
        // Fetch messages from the backend when the component mounts
        fetch(API_URL+ '/api/messages')
            .then(response => response.json())
            .then(data => setMessages(data))  // Load the messages from backend into state
            .catch(error => console.error("Error fetching messages:", error));

        // Set up WebSocket connection for real-time updates
   // Set up WebSocket connection for real-time updates
   const socket = new WebSocket('ws://localhost:8080/ws');

   // Log connection opening
   socket.onopen = () => {
       console.log("WebSocket connection established");
   };

   // Handle WebSocket message event
   socket.onmessage = (event) => {
       console.log("WebSocket message received:", event.data);

       // Display notification and refresh the messages list when an update is received
       setNotification(event.data);
       fetchMessages(); // Re-fetch the updated messages
   };

   // Log connection closing
   socket.onclose = () => {
       console.log("WebSocket connection closed");
   };

   // Log connection errors
   socket.onerror = (error) => {
       console.error("WebSocket error:", error);
   };

   // Cleanup function to close the WebSocket when the component unmounts
   return () => socket.close();
    }, []); // Empty dependency array ensures this runs only once

    useEffect(()=>{

    },[messages])
    // Function to re-fetch messages from the backend
    const fetchMessages = () => {
        fetch(API_URL+ '/api/messages')
            .then(response => response.json())
            .then(data => setMessages(data))
            .catch(error => console.error("Error fetching messages:", error));
    };
    // Handler to select a message
    const handleSelectMessage = async (message) => {
        setSelectedMessage(message); // Set the selected message when clicked
        console.log("message Id: ", message.id)
      await  fetch(API_URL + `/api/updateState/${message.id}?handled=false`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(null) // Include response text if necessary
        })
        fetchMessages();
       
    };

    const handleSendResponse = (Response) => {
        if (selectedMessage) {
            const messageId = selectedMessage.id; // Get the message ID
    
            // Update message state by sending PUT request
            fetch(API_URL + `/api/updateState/${messageId}?handled=true`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(Response) // Include response text if necessary
            })
            .then((response) => {
                if (response.ok) {                 
                    fetchMessages(); // Re-fetch messages to update the UI
                } else {
                    console.error("Failed to update message state");
                }
            })
            .catch((error) => console.error("Error updating message state:", error));
        } else {
            console.log("No message selected to update.");
        }
    
        console.log(`Response sent: ${Response}`);
        alert("Response sent");
        setSelectedMessage(null);
    };
    

    return (
        <>
        <Header/>
        <div className="py-20">
            {notification && <Notification message={notification} />}
            <div className="grid grid-cols-2 gap-4">
                {/* Left side: Message list (Scrollable) */}
                <div className="col-span-1 h-[500px] overflow-y-auto">
                    <MessageList messages={messages} onSelectMessage={handleSelectMessage} />
                </div>
    
                {/* Right side: Message details (Static, non-scrollable) */}
                <div className="col-span-1">
                    {selectedMessage ? (
                        <MessageDetails message={selectedMessage} onSendResponse={handleSendResponse} />
                    ) : (
                        <div className="text-gray-500">Select a message to view details</div>
                    )}
                </div>
            </div>
        </div>
        </>
    
    );
};

export default Dashboard;
