import {SCSocket} from "@/types/SocketTypes";

function getDeviceHandler(){
    // TODO: make get device list
}

export const getDeviceListFunc = (io, socket: SCSocket) => {
    socket.on("get-devices", getDeviceHandler);
}