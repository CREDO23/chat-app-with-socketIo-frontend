import type Message from '../messages';

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
