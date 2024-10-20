
# CS_MsgApp

CS_MsgApp is a messaging application built using React (with Vite for the frontend) and Spring Boot for the backend. It manages customer messages and ensures that no two agents work on the same message concurrently using WebSocket-based communication.

---

## Project Overview

### Basic Features:
- **Message Management**: Users can submit messages through the frontend, which are stored in the backend (MySQL database).
- **Agent Handling**: Agents can manage customer messages by marking them as `in progress` or `closed`.

### Additional Features Implemented:
- **WebSocket Real-Time Notifications**: WebSocket is implemented to ensure real-time message updates for agents. It prevents multiple agents from working on the same message simultaneously.
- **Message State Handling**: Each message has states (`in progress`, `closed`), and agents can mark them accordingly. Only one agent can handle a message at a time.

---

## Setup and Run Instructions

### Prerequisites
The following software must be installed on the local machine:
- Java 17 or later
- Node.js 16.x or later
- MySQL 8.x or later
- Maven 3.x or later
- Git (optional, for version control)

### Backend Setup (Spring Boot)

1. **Clone the repository**:
   
bash
   git clone <your-private-repo-url>
  

2. **Configure the MySQL Database**:
   - Open MySQL and create a new database:
     
sql
     CREATE DATABASE cs_message_app;
    
   - Update the `application.properties` file in `src/main/resources/` with your MySQL credentials:
     
properties
     spring.datasource.url=jdbc:mysql://localhost:3306/cs_message_app
     spring.datasource.username=<your-username>
     spring.datasource.password=<your-password>
     spring.jpa.hibernate.ddl-auto=update
    

3. **Install Backend Dependencies**:
   Navigate to the root directory (where the `pom.xml` file is located) and run:
   
bash
Run the Backendl
  

4. **Run the Backend**:
   Start the Spring Boot backend by running:
   
bash
   mvn spring-boot:run
  
   The backend will be running at `http://localhost:8080`.

---

### Frontend Setup (React with Vite)

1. **Navigate to the Frontend Directory**:
   
bash
   cd frontend
  

2. **Install Frontend Dependencies**:
   Install the required Node.js packages:
   
bash
   npm install
  

3. **Start the Vite Development Server**:
   Run the following command to start the development server:
   
bash
   npm run dev
  
   The frontend will be running at `http://localhost:5173`.

---

### MySQL Configuration

Make sure MySQL is installed and running on your machine. You can create the necessary database with the following SQL commands:
sql
CREATE DATABASE cs_message_app;
CREATE USER 'cs_app_user'@'localhost' IDENTIFIED BY 'yourpassword';
GRANT ALL PRIVILEGES ON cs_message_app.* TO 'cs_app_user'@'localhost';
FLUSH PRIVILEGES;

Ensure your `application.properties` file is updated with the correct credentials.

---

## Run Instructions

### Backend:
To start the backend:
bash
mvn spring-boot:run

### Frontend:
To start the frontend:
bash
cd frontend
npm run dev
`

Both services need to be running concurrently for full functionality.

---

## DepSpring Web Backend (Spring BSpring Data JPAb**: For REST APIs
- **SprinMySQL Connectoratabase operations
- **MySpring Boot DevToolsQL connection
- **Spring Boot DevTools*Lomboke reload during development
- *WebSocket reduce boilerplate code
- **WebHibernate real-time communication
- **Hibernate**: For ORM withReact Frontend (React with Vite):
- **React**: FrontendVite for building user interfaces
- Axios Fast development builWebSocketios**: For HTTP requests
- **WebSockeTailwind CSSme data communication
- **Tailwind CSS**: For styling

---Real-time message updatesemented

- **Real-time message updates** using WebSocket to prevent multiple ageMessage state handlingme message.
- **Message state handling** to ensure messages are marked as `in progress` or `closed`.

---

## Notes

- Ensure that the MySQL server is up and running before starting the backend.
- The frontend and backend need to be running simultaneously for the application to function correctly.
`

