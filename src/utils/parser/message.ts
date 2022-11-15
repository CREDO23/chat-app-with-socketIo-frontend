
import type MessageProps from '../../types/props/message';
import type Message from '../../types/messages'

export const parseMessage = (message : Message, userName: string): MessageProps => {

    const isForeign = message.sender.userName != userName;

    const isPrivate = message.recipient.userName ? true : false;

    const time = message.updatedAt;

    const content = message.content;

    const sender = message.sender.userName;

    const recipient = message.recipient.userName || message.recipient.name;

    return {
        isForeign,
        isPrivate,
        time,
        sender,
        recipient,
        content,
    };
};