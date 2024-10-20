
Here's a detailed README.md for your CS_MsgApp application that includes the setup for both React (frontend) and Spring Boot (backend), along with clear instructions for setting up and running the solution, including additional features:

---

# CS_MsgApp

## Description
CS_MsgApp is a customer support messaging application where agents can handle customer inquiries. The system prevents multiple agents from working on the same message by marking message states (e.g., "in progress" or "closed"). It utilizes WebSockets for real-time communication, ensuring that agents receive live updates when the status of a message changes.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
  - [Backend (Spring Boot)](#backend-spring-boot)
  - [Frontend (React)](#frontend-react)
- [Running the Application](#running-the-application)
- [Additional Features](#additional-features)
- [Important Notes](#important-notes)

---

## Technologies Used

### Backend (Spring Boot):
- Spring Boot
- Hibernate (JPA)
- WebSocket
- H2 Database (or MySQL for production)
- Maven

### Frontend (React):
- React
- WebSocket
- Tailwind CSS
- Axios

---

## Features
- Message Handling: Agents can mark messages as "in progress" or "closed."
- WebSockets: Live updates for agents when a message state changes, preventing two agents from working on the same message.
- Message States: Each message is tracked with states (new, in-progress, closed) to ensure proper handling by agents.
- Real-Time Notifications: Agents are notified in real-time when another agent picks up or closes a message.

---

## Setup Instructions

### Backend (Spring Boot)

#### Prerequisites:
1. Java JDK 17 or higher
2. Maven
3. An IDE (like IntelliJ IDEA or Eclipse)
4. Postman or cURL (for testing the APIs)
5. Git

#### Steps:
1. Clone the repository to your local machine:
  
   git clone <repo-url>
   
2. Navigate to the backend folder:
  
   cd CS_MsgApp/backend
   
3. Install Maven dependencies and build the project:
  
   mvn clean install
   
4. Run the Spring Boot application:
  
   mvn spring-boot:run
   
5. Access the application at:
  
   http://localhost:8080
   
#### Dependencies:
- Spring Boot Web
- Spring Data JPA (Hibernate)
- WebSocket
- H2 Database (In-memory for development; replace with MySQL for production)
- Maven

### Frontend (React)

#### Prerequisites:
1. Node.js and npm (Node Package Manager)
2. Git

#### Steps:
1. Navigate to the frontend folder:
  
   cd CS_MsgApp/frontend
   
2. Install all the required dependencies:
  
   npm install
   
3. Start the React application:
  
   npm start
   
4. Access the frontend at:
  
   http://localhost:3000
   
#### Dependencies:
- React
- WebSocket API
- Tailwind CSS for styling
- Axios for making HTTP requests

---

## Running the Application

1. Start Backend:
   - Ensure the Spring Boot application is running on http://localhost:8080.
   - The backend exposes WebSocket connections at ws://localhost:8080/ws and REST endpoints at /api/messages for message handling.

2. Start Frontend:
   - Ensure the React app is running on http://localhost:3000.
   - The frontend will automatically connect to the WebSocket and listen for real-time updates.

---

## Additional Features

- Message States:
  - Messages are assigned a state (new, in-progress, closed), ensuring that no two agents work on the same message simultaneously.
  
- WebSocket Integration:
  - WebSocket broadcasts notify agents about updates on message states, ensuring real-time collaboration among support agents.

  
---

## Important Notes

- The application uses an in-memory MySql database for development.  
- Ensure that the backend and frontend are running on the same machine or accessible from each other for WebSocket connections to work properly.


- All API routes can be tested using Postman or cURL, including creating, updating, and fetching messages.

---
