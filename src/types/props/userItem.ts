import React from 'react';
import USER from '../user';

type UserItem = {
    userName: string;
    id: string;
    avatar?: string;
    online: boolean;
    mode?: 'private' | 'channel';
    setUserChat: React.Dispatch<React.SetStateAction<USER[]>>;
    setRightSide?: React.Dispatch<React.SetStateAction<'users' | 'me'>>;
    setMainSide?: React.Dispatch<
        React.SetStateAction<'chats' | 'users' | 'messages' | 'profil'>
    >;
};

export default UserItem;
