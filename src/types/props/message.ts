type MessageProps = {
    isForeign: boolean;
    isPrivate: boolean;
    time: string;
    content: string;
    sender: string;
    recipient?: string;
};

export default MessageProps;
