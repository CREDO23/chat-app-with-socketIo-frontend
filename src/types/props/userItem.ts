import React from 'react';
import USER from '../user';

type UserItem = {
    userName: string;
    id: string;
    avatar?: string;
    online: boolean;
    mode?: 'private' | 'channel';
    setUserChat: React.Dispatch<React.SetStateAction<any[]>>;
};

export default UserItem;
