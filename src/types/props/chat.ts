import type Message from './message';

type Chat = {
    name: string;
    lastMessage: Message;
    newMessageCount: number;
    messages: Message[];
    showMessages: () => void;
};

export default Chat;
