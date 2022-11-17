import type Message from '../../types/messages';
import type Chat from '../../types/chat';
import type USER from '../../types/user';
import MessageProps from '../../types/props/message';

export const parseNewMessageCount = (
    lastUpdate: string,
    messages: Message[],
): number => {
    let count = 0;

    messages.forEach((message) => {
        if (
            new Date(message.updatedAt as string).getTime() >
            new Date(lastUpdate).getTime()
        ) {
            count++;
        }
    });

    return count;
};

export const parseLastMessage = (
    chat: Chat,
    userName: string,
): MessageProps => {
    const lastMessage = chat.messages[chat.messages.length - 1];

    const isForeign = lastMessage?.sender?.userName != userName;

    const isPrivate = chat.isPrivate;

    const time = lastMessage.updatedAt as string;

    const content = lastMessage.content;

    const sender = lastMessage.sender.userName;

    const recipient = chat.name;

    return {
        isForeign,
        isPrivate,
        time,
        sender,
        recipient,
        content,
    };
};

export const parseName = (chat: Chat, user: USER): string[] => {
    let name: string;
    let context: string;

    if (chat.name.split('-').length > 1) {
        name = chat.name.split('-').filter((name) => name != user.userName)[0];
        context = 'channel';
    } else {
        name = chat.name;
        context = 'user';
    }

    return [name, context];
};
