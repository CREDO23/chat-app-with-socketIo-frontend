import type USER from './user';
import type Chat from './chat';

type Message = {
    id?: string;
    sender: USER;
    recipient?: USER & 'chat';
    content: string;
    updatedAt?: string;
};

export default Message;
