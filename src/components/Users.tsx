import UserItem from './UserItem';
import React, { useState, useContext } from 'react';
import socketContext from '../context';
import type UserList from '../types/props/userChatList';
import type USER from '../types/user';
import { setCurrentChat, setNewChat } from '../store/slices/chats';
import { parseName } from '../utils/parser/chat';
import { useAppSelector, useAppDispatch } from '../store/hooks/index';

type Props = {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setRightSide?: React.Dispatch<React.SetStateAction<'users' | 'me'>>;
    setMainSide?: React.Dispatch<
        React.SetStateAction<'chats' | 'users' | 'messages' | 'profil'>
    >;
};

function users({
    users,
    setSearch,
    setMainSide,
    setRightSide,
}: UserList & Props): JSX.Element {
    const [mode, setMode] = useState<'private' | 'channel'>('private');

    const [chatName, setChatName] = useState<string>('');

    const currentUser = useAppSelector((state) => state.currentUser.user);

    const [usersChat, setUsersChat] = useState<USER[]>([currentUser]);

    const chats = useAppSelector((state) => state.chats);

    const dispatch = useAppDispatch();

    const statrtChannelChat = (): void => {
        setSearch('');
        if (
            chats.chats.filter(
                (chat) => parseName(chat, currentUser as USER)[0] == chatName,
            )[0]
        ) {
            setChatName((prev) => prev + new Date().toTimeString());
        }
        dispatch(
            setCurrentChat({
                name: chatName,
                users: usersChat,
                isPrivate: false,
                messages: [],
                lastViews: new Map(),
            }),
        );
        dispatch(
            setNewChat({
                name: chatName,
                users: [...usersChat.map((user) => user._id)] as string[],
                isPrivate: false,
                messages: [],
                lastViews: new Map(),
            }),
        );
    };

    const io = useContext(socketContext);

    const socket = io?.getSocket();

    return (
        <>
            <div className=" w-full px-2">
                <input
                    type="text"
                    autoComplete="off"
                    autoCorrect="off"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search a user here ..."
                    className="w-full px-3 py-1 flex text-slate-900 placeholder-gray-300 border border-gray-100 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                />
            </div>
            <div className="flex my-2 items-start justify-between w-full px-2">
                <select
                    onChange={(e) =>
                        setMode(
                            e.target.value as React.SetStateAction<
                                'private' | 'channel'
                            >,
                        )
                    }
                    className="bg-gray-50 w-3/5 border border-gray-300 text-sky-900 text-sm rounded-lg dark:border-l-gray-700 border-l-2 focus:ring-white focus:border-gray-400 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                >
                    <option selected value="private">
                        Direct Chat
                    </option>
                    <option value="channel">Channel Chat</option>
                </select>
                {mode == 'channel' && (
                    <button
                        disabled={chatName.length < 5 || usersChat.length < 2}
                        onClick={() => {
                            statrtChannelChat();
                            socket?.emit(
                                'join_users',
                                usersChat.map((user) => user._id),
                                chatName,
                            );
                            if (setMainSide) setMainSide('messages');
                            if (setRightSide) setRightSide('me');
                            setSearch('');
                        }}
                        className="w-1/5 font-medium bg-sky-200 disabled:hidden text-center  text-sky-800 p-1 rounded-lg cursor-pointer"
                    >
                        Start
                    </button>
                )}
            </div>
            {mode == 'channel' && (
                <div className=" w-full px-2">
                    <input
                        type="text"
                        onChange={(e) => setChatName(e.target.value)}
                        placeholder="Chat name"
                        className="w-full px-3 py-1 flex text-slate-900 placeholder-gray-300 border border-gray-100 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                    />
                </div>
            )}

            <div className="no-scrollbar w-full overflow-y-auto">
                {users.map((item) => {
                    return (
                        <UserItem
                            setSearch={setSearch}
                            setMainSide={setMainSide}
                            setRightSide={setRightSide}
                            setUserChat={setUsersChat}
                            mode={mode}
                            email={item.email as string}
                            key={item.userName}
                            avatar={item.avatar as string}
                            online={item.isLogged as boolean}
                            userName={item.userName}
                            id={item._id as string}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default React.memo(users);
