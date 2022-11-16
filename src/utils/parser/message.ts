import type MessageProps from '../../types/props/message';
import type Message from '../../types/messages';

export const parseMessage = (
    message: Message,
    userName: string,
): MessageProps => {
    const isForeign = message.sender.userName != userName;

    const isPrivate = message.recipient ? true : false;

    const time = message.updatedAt as string;

    const content = message.content;

    const sender = message.sender.userName;

    const recipient = message.recipient ? message.recipient.userName : 'chat'

    return {
        isForeign,
        isPrivate,
        time,
        sender,
        recipient,
        content,
    };
};
