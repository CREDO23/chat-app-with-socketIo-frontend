import type USER from './user';
import type Message from './messages';

type Chat = {
    _id?: string;
    admin?: string;
    isPrivate: boolean;
    name: string;
    avatar?: string;
    users: USER[] | string[];
    messages: Message[];
    updatedAt: string;
};

export type ChatState = {
    loading: boolean;
    newMessageLoading: boolean;
    currentChat: Chat | null;
    newChat: Chat | null;
    chats: Chat[];
};

export type GetChatResponse = {
    message: string;
    data: Chat[];
};

export type AddChatResponse = {
    message: string;
    data: Chat;
};

export default Chat;
