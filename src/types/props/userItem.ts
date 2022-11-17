type UserItem = {
    userName: string;
    id : string;
    avatar?: string;
    online: boolean;
    mode?: 'private' | 'channel';
};

export default UserItem;
