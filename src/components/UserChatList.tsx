import logo from '../assets/logo.png';
import type ChatListProps from '../types/props/userChatList';

export default function ({users} : ChatListProps): JSX.Element {
    return (
        <div className="bg-white absolute z-20 top-3 right-3 ml-auto h-auto w-60   rounded shadow dark:bg-gray-700">
            <ul className="py-1 no-scrollbar overflow-y-auto max-h-[30rem] text-gray-700 dark:text-gray-200">
                {users.map((user) => {
                    return (
                        <li>
                            <span className="flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                <span className="relative h-[1.5rem] mr-1  w-[1.5rem]">
                                    <img
                                        className=" border  rounded-full"
                                        src={user.avatar || logo}
                                        alt={user.userName}
                                    />

                                    <span className="bottom-0 left-4 absolute  w-2.5 h-2.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                                </span>
                                {user.userName}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
