import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';

let io: Server;
let initPromise: any;

function initializeSocket(server: HTTPServer): Server {
  io = new Server(server, {
    cors: {
      origin: "*", // Adjust origin as needed
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      // Listen for a user to join a session
      socket.on("createNewQuizSession", (sessionId) => {
        // Add the socket to a room with the quiz session ID as the room name
        socket.join(sessionId);
        console.log(`Client ${socket.id} joined session room: ${sessionId}`);
      });

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });

  // Resolve initPromise to indicate io is initialized
  if (!initPromise) {
    initPromise = Promise.resolve();
  } 

  return io;
}

// Helper to get the io instance
export const getSocketInstance = () => io;

export default initializeSocket;
