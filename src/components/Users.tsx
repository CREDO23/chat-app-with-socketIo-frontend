import UserItem from './UserItem';
import React, { useState } from 'react';
import type UserList from '../types/props/userChatList';
import type USER from '../types/user'

type Props = {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function ({ users, setSearch }: UserList & Props): JSX.Element {
    const [mode, setMode] = useState<'private' | 'channel'>('private');

    const [usersChat , setUserChat] =  useState<any[]>([])

    return (
        <>
            <div className=" w-full px-2">
                <input
                    type="text"
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
                    <p className="w-1/5 font-medium bg-sky-200 text-center  text-sky-800 p-1 rounded-lg cursor-pointer">
                        Start
                    </p>
                )}
            </div>
            {mode == 'channel' && (
                <div className=" w-full px-2">
                    <input
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Chat name"
                        className="w-full px-3 py-1 flex text-slate-900 placeholder-gray-300 border border-gray-100 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                    />
                </div>
            )}

            <div className="no-scrollbar w-full overflow-y-auto">
                {users.map((item) => {
                    
                    return (
                        <UserItem
                            setUserChat={setUserChat}
                            mode={mode}
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
