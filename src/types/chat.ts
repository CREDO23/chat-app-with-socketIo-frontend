import type Message from './message';

type Chat = {
    isNew: boolean;
    messages: Message[];
};

export default Chat;
