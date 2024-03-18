import { io, Socket } from "socket.io-client";

export const socket: Socket = io("https://backend.opine.ink", {
  path: "/api/notification/socket.io",
  autoConnect: false,
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});
