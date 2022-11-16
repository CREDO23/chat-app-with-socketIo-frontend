import UserItem from './UserItem';
import { useState } from 'react';
import type UserList from '../types/props/userChatList'

export default function ({users} : UserList): JSX.Element {
    const [mode, setMode] = useState<'private' | 'channel'>('private');

    return (
        <>
            <div className=" w-full px-2">
                <input
                    type="text"
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
            <div className="no-scrollbar w-full overflow-y-auto">
                {users.map((item) => {
                    return (
                        <UserItem
                            mode={mode}
                            key={item.userName}
                            imageProfile={item.avatar}
                            online={item.isLogged as boolean}
                            userName={item.userName}
                        />
                    );
                })}
            </div>
        </>
    );
}
