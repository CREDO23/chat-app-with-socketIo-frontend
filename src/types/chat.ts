import type USER from './user';
import type Message from './messages';

type Chat = {
    admin?: string;
    isPrivate: boolean;
    name: string;
    avatar: string;
    users: USER[];
    messages: Message[];
    updatedAt: string;
};

export type ChatState = {
    loading: boolean;
    currentChat: Chat | null;
    lastUpdate: string;
    chats: Chat[] | null;
};

export type ChatResponse = {
    message: string;
    data: Chat[];
};

export default Chat;
