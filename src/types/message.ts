type Message = {
    isForeign: boolean;
    isPrivate: boolean;
    time: Date;
    content: string;
    sender: string;
};

export default Message;
