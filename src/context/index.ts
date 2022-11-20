import { createContext } from 'react';
import io, { Socket } from 'socket.io-client';

export class SocketIO {
    public   static socket: Socket;

    connect = (id : string, urlServer: string) => {
        SocketIO.socket = io(`${urlServer}`, {
            auth: {
                userId:id
            },
        });
    };

    getSocket = () => {
        return SocketIO.socket
    };
}

const socketContext = createContext<SocketIO | null>(null);

export default socketContext;
