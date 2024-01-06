import { io } from "socket.io-client";
const socketRef = io("ws://192.168.1.15:3500");

export default socketRef;
