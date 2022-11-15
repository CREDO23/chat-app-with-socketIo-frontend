import type Chat from '../../types/chat';
import type Message from '../../types/props/message';
import type USER from '../../types/user';

export const parseNewMessageCount = (
    lastUpdate: string,
    chats: Chat[],
): number => {
    let count = 0;

    chats.forEach((chat) => {
        if (
            new Date(chat.updatedAt).getTime() > new Date(lastUpdate).getTime()
        ) {
            count++;
        }
    });

    return count;
};

export const parseLastMessage = (chat: Chat , userName : string): Message => {
    const lastMessage = chat.messages[chat.messages.length - 1];

    const isForeign = lastMessage.sender.userName  != userName

    const isPrivate = chat.isPrivate;

    const time = lastMessage.updatedAt;

    const content = lastMessage.content;

    const sender = lastMessage.sender.userName;

    const recipient = chat.name

    return {
        isForeign,
        isPrivate,
        time,
        sender,
        recipient,
        content,
    };
};

export const parseName = (chat: Chat, user: USER): string => {
    let name : string

    if (chat.name.split('-').length > 1) {
        name = chat.name.split('-').filter((name) => name != user.userName)[0]
    } else {
        name = chat.name;
    }

    return name
};
