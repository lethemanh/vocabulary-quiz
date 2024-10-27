import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const initializeSocket = (serverUrl: string) => {
  socket = io(serverUrl);
};

export {
  socket
};