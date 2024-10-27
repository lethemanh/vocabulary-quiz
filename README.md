# System Design Document: Real-Time Vocabulary Quiz Application

## Overview

This document outlines the system design for a real-time vocabulary quiz application, including an architecture diagram, component descriptions, data flow, and technologies used.

---

### 1. **Architecture Diagram**
<a href="https://ibb.co/6rGJ135"><img src="https://i.ibb.co/GnG3tKj/Real-Time-Vocabulary-Quiz.png" alt="Real-Time-Vocabulary-Quiz" border="0"></a>

---

### 2. **Component Description**

**1. Application (Frontend)**
   - **Purpose**: This is the client-side interface where users interact with the quiz application. Users can create or join a quiz session, answer questions, and view the real-time leaderboard.
   - **Technology**: ReactJS, chosen for its interactive and efficient UI-building capabilities, supporting a responsive and real-time user experience.

**2. Socket.io**
   - **Purpose**: Used to facilitate real-time communication between the server and client, allowing for instantaneous updates to scores and leaderboards across all connected clients.
   - **Technology**: Socket.IO on Node.js, as it abstracts WebSocket connections and provides reliable, event-based communication with client reconnection capabilities.

**3. Quiz Service**
   - **Purpose**: Manages quiz session creation, questions loading, and quiz session participants. It also interacts with Kafka to handle events.
   - **Technology**: Node.js with Express, chosen for its asynchronous handling and scalability, suitable for high-demand applications.

**4. Leaderboard Service**
   - **Purpose**: Handles updates to the leaderboard by fetching and updating real-time leaderboard from Redis and MongoDB to ensure consistent leaderboard status.
   - **Technology**: Node.js, which complements the event-driven architecture needed for real-time updates, supported by fast in-memory data storage.

**5. Apache Kafka (Message Broker)**
   - **Purpose**: Manages message queues, with specific queues for “Quiz Session Creating” and “Check User’s Answer” to facilitate asynchronous processing and decoupling of services.
   - **Reason for Choice**: Kafka is highly reliable and efficient for message streaming, offering fault-tolerance, scalability, and persistent storage for event handling.

**6. Database (MongoDB and Redis)**
   - **MongoDB**: Serves as the primary storage for quiz sessions, questions, and quiz session participants information.
   - **Redis**: A fast, in-memory data store, used to cache frequently updated leaderboard data, ensuring fast retrieval and minimal latency.
   - **Reason for Choice**: MongoDB is flexible and scalable for document-based storage, while Redis provides high-speed caching critical for real-time applications.

**7. Monitoring & Logging (Prometheus + Grafana, ELK Stack)**
   - **Purpose**: Enables system monitoring and logging, ensuring observability in real-time. Prometheus monitors metrics, Grafana visualizes them, and ELK Stack captures logs for error tracking.
   - **Reason for Choice**: Prometheus and Grafana offer robust, flexible monitoring, and the ELK Stack provides efficient, centralized log management.

---

### 3. **Data Flow**

This Data Flow Diagram explains how data flows through the system from when a user joins a quiz to when the leaderboard is updated.

<a href="https://ibb.co/h8vybQv"><img src="https://i.ibb.co/PC8NKX8/Real-Time-Vocabulary-Quiz-DFD.png" alt="Real-Time-Vocabulary-Quiz-DFD" border="0"></a><br />

This is DB design

<a href="https://ibb.co/qDFKwZ7"><img src="https://i.ibb.co/fXGf7cq/Vocabulary-Quiz-DB-Design.png" alt="Vocabulary-Quiz-DB-Design" border="0"></a>

---

### 4. **Technologies and Tools Justification**

| Component                | Technology                | Justification                                                                 |
|--------------------------|---------------------------|------------------------------------------------------------------------------|
| **Client-side**          | ReactJS                   | Provides a highly interactive and efficient UI for a real-time application. |
| **Backend**              | Node.js with Express      | Offers asynchronous handling and scalability for high-demand applications.  |
| **WebSocket**            | Socket.IO                 | Provides reliable, event-based real-time communication with auto-reconnect. |
| **Database**             | MongoDB, Redis            | MongoDB for flexible storage; Redis for high-speed caching of leaderboard.  |
| **Message Broker**       | Apache Kafka              | Scalable, fault-tolerant messaging with persistent event storage.           |
| **Monitoring**           | Prometheus + Grafana      | Robust metrics monitoring and visualization for real-time observability.    |
| **Logging**              | ELK Stack                 | Centralized logging for error tracking and performance insights.            |

--- 

This design ensures scalability, high performance, and real-time responsiveness while providing a clear data flow, resilient architecture, and efficient handling of messages and events.

--

## Record of Presentation

https://drive.google.com/file/d/1iIIJnkCJQ24thEkfRNCXJqklTZsJ8aPL/view?usp=sharing