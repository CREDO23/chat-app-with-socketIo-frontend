import UserItem from '../types/props/userItem';
import logo from '../assets/logo.png';
import { useContext } from 'react';
import socketContext from '../context';
import { parseContent } from '../utils/parser/index';
import { useAppDispatch, useAppSelector } from '../store/hooks/index';
import { setCurrentChat, setNewChat } from '../store/slices/chats';
import { parseName } from '../utils/parser/chat';
import type USER from '../types/user';
import Chat from '../types/chat';

export default function ({
    online,
    userName,
    mode,
    email,
    id,
    avatar,
    setUserChat,
    setMainSide,
    setRightSide,
    setSearch,
}: UserItem): JSX.Element | null {
    const dispatch = useAppDispatch();

    const currentUser = useAppSelector((state) => state.currentUser.user);

    const chats = useAppSelector((state) => state.chats);

    const startChat = () => {
        setSearch('');
        if (mode == 'private') {
            if (
                chats.chats.filter(
                    (chat) =>
                        parseName(chat, currentUser as USER)[0] == userName,
                )[0]
            ) {
                const id = chats.chats.filter(
                    (chat) =>
                        parseName(chat, currentUser as USER)[0] == userName,
                )[0]._id;
                if (id) {
                    dispatch(setCurrentChat(id));
                    setMainSide && setMainSide('messages');
                }
            } else {
                socket?.emit(
                    'join_users',
                    [currentUser._id, id],
                    `${currentUser?.userName}-${userName}`,
                );
                dispatch(
                    setCurrentChat({
                        name: `${currentUser?.userName}-${userName}`,
                        avatar: avatar,
                        users: [
                            {
                                _id: id,
                                userName,
                            },
                            {
                                _id: currentUser?._id,
                                userName: currentUser?.userName as string,
                            },
                        ],
                        isPrivate: true,
                        messages: [],
                        lastViews: new Map(),
                    } as Chat),
                );
                dispatch(
                    setNewChat({
                        name: `${currentUser?.userName}-${userName}`,
                        avatar: avatar,
                        users: [currentUser?._id as string, id as string],
                        isPrivate: true,
                        messages: [],
                        lastViews: new Map(),
                    } as Chat),
                );
                if (setMainSide) setMainSide('messages');
                if (setRightSide) setRightSide('me');
            }
        }
    };

    const io = useContext(socketContext);

    const socket = io?.getSocket();

    if (currentUser.userName == userName) {
        return null;
    }

    return (
        <div
            onClick={() => {
                startChat();
            }}
            className="w-full relative cursor-pointer my-1 bg-white px-2 h-[3.5rem] rounded flex items-center"
        >
            <span className="relative h-[3rem] mr-1  w-[3rem]">
                <img
                    className=" border w-[3rem] object-cover h-[3rem] rounded-full"
                    src={avatar || logo}
                    alt=""
                />
                {online && (
                    <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                )}
            </span>

            <div className=" cursor-pointer w-[14rem] flex justify-between ">
                <label
                    htmlFor={userName}
                    className="text-sm flex flex-col cursor-pointer items-start justify-between  text-slate-900"
                >
                    <p> {parseContent(userName, 15)}</p>
                    <p className="text-gray-400 font-light text-xs">{email}</p>
                </label>

                {mode == 'channel' && (
                    <div className="flexitems-center mb-4">
                        <input
                            id={userName}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    setUserChat((prevSate): any[] => {
                                        return [
                                            ...prevSate,
                                            {
                                                _id: id,
                                                userName,
                                            },
                                        ];
                                    });
                                } else {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    setUserChat((prevSate): any[] => {
                                        return prevSate.filter(
                                            (user) => user._id != id,
                                        );
                                    });
                                }
                            }}
                            type="checkbox"
                            value={userName}
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-30 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
