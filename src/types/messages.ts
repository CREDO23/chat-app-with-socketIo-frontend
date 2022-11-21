import type USER from './user';

type Message = {
    id?: string;
    sender: USER;
    recipient?: USER;
    content: string;
    updatedAt?: string;
};

export default Message;
