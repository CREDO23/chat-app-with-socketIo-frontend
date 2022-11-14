import type { UserChat } from './user';
import type { Message } from './messages';

export type Chat = {
    admin?: string;
    name: string;
    avatar: string;
    users: UserChat[];
    messages: Message[];
};

export type ChatState = {
    loading: boolean;
    currentChat : Chat | null
    chats: Chat[] | null;
};

export type ChatResponse = {
    message : string ,
    data : Chat[]
}
