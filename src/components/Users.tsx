import UserItem from './UserItem';
import userItems from '../../fakedata/userItem.json';
import {  useState } from 'react';

export default function (): JSX.Element {

    const [type,setType] = useState<'private' | 'channel'>('private')


    return (
        <>
            <div>
                <input
                    type="text"
                    id="message"
                    placeholder="Search a user here ..."
                    className="w-full px-3 py-2 flex text-slate-900 placeholder-gray-300 border border-gray-100 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                />
            </div>
            <div className="flex my-2 flex-col items-end justify-end w-full px-2">
                
                <select
                    onChange={(e) => setType(e.target.value as React.SetStateAction<"private" | "channel">)}
                    className="bg-gray-50 border border-gray-300 text-sky-900 text-sm rounded-lg dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option selected value='private'>Direct Message</option>
                    <option value="channel">Channel Message</option>
                    
                </select>
            </div>
            <div className="no-scrollbar overflow-y-auto">
                {userItems.map((item) => {
                    return (
                        <UserItem
                            mode={type}
                            key={item.userName}
                            imageProfile={item.imageProfile}
                            online={item.online}
                            userName={item.userName}
                        />
                    );
                })}
            </div>
        </>
    );
}
