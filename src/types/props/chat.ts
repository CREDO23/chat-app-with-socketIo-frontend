import type Message from '../messages';
import type MessageProps from './message'

type ChatProps = {
    name: string;
    lastMessage: MessageProps;
    newMessageCount: number;
    messages: Message[];
    showMessages: React.Dispatch<
        React.SetStateAction<'users' | 'profil' | 'chats' | 'messages'>
    >;
};

export default ChatProps;
