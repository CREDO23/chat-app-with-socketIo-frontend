import type Message from './message';

type ChatProps = {
    name: string;
    lastMessage: Message;
    newMessageCount: number;
    messages: Message[];
    showMessages: React.Dispatch<
        React.SetStateAction<'users' | 'profil' | 'chats' | 'messages'>
    >;
};

export default ChatProps;
