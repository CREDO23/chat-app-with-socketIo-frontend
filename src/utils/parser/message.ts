import type MessageProps from '../../types/props/message';
import type Message from '../../types/messages';
import type USER from '../../types/user';
import type Chat from '../../types/chat';

export const parseMessage = (
    message: Message,
    userName: string,
    chat : Chat
): MessageProps => {
    const isForeign = message.sender.userName != userName;

    const isPrivate = chat.isPrivate

    const time = message.updatedAt as string;

    const content = message.content;

    const sender = message.sender.userName;

    const recipient = message.recipient ? message.recipient.userName : 'chat';

    return {
        isForeign,
        isPrivate,
        time,
        sender,
        recipient,
        content,
    };
};

export const parseRecipient = (users: USER[], userName: string): string => {
    let recipient = ' ';

    if (users.length > 2) {
        recipient = 'chat';
    } else {
        const target = users.filter((user) => user.userName !== userName)[0];
        recipient = target.userName;
    }

    return recipient;
};
