import http from "http";
import io from 'socket.io'

const socket_http = http.createServer();

const socket_server = new io.Server(socket_http, {
    cors: {
        origin: "*"
    }
});

// TODO: Token validation, join to user room
socket_server.use((socket, next) => {
    console.log("token");

});

// TODO:
socket_server.on('connection', (socket) => {
    console.log("COOKIE:" + socket.request.headers.cookie);
    socket.on('disconnect', reason => disconnectHandler(socket));
    socket.emit('start', socket.request.headers.cookie);
});

let disconnectHandler = (socket) => {
    console.log("SOCKET CLOSED " + socket.id);
}

export default socket_http;