import logo from '../assets/logo.png';
import type ChatListProps from '../types/props/userChatList';

export default function ({ users }: ChatListProps): JSX.Element {
    return (
        <div className="bg-white absolute z-20 top-3 right-3 ml-auto h-auto w-60   rounded shadow dark:bg-gray-700">
            <ul className="py-1 no-scrollbar overflow-y-auto max-h-[30rem] text-gray-700 dark:text-gray-200">
                {users.map((user) => {
                    return (
                        <li key={user.userName}>
                            <span className="flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                <span className="relative h-[1.5rem] mr-1  w-[1.5rem]">
                                    <img
                                        className=" border object-cover rounded-full"
                                        src={user.avatar || logo}
                                        alt={user.userName}
                                    />
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
