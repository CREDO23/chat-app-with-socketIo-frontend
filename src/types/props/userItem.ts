import React from 'react';
import USER from '../user';

type UserItem = {
    userName: string;
    id: string;
    avatar?: string;
    online: boolean;
    mode?: 'private' | 'channel';
    setUserChat: React.Dispatch<React.SetStateAction<USER[]>>;
};

export default UserItem;
