import type USER from '../../types/user';
import type UserItem from '../../types/props/userItem';

export const parseUser = (
    user: USER,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setUserChat: React.Dispatch<React.SetStateAction<any[]>>,
): UserItem => {
    return {
        userName: user.userName,
        avatar: user.avatar,
        online: user.isLogged as boolean,
        id: user._id as string,
        setUserChat,
    };
};
