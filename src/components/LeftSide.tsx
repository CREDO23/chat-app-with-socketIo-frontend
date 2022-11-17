import Chat from '../components/Chat';
import { useAppSelector } from '../store/hooks';
import {
    parseLastMessage,
    parseName,
    parseNewMessageCount,
} from '../utils/parser/chat';
import type USER from '../types/user';
import { getChats } from '../store/slices/chats';
import { useAppDispatch } from '../store/hooks/index';
import { useEffect } from 'react';
import toast from '../utils/toasty/index';

type Props = {
    setMainSide: React.Dispatch<
        React.SetStateAction<'users' | 'profil' | 'chats' | 'messages'>
    >;
    setRightSide: React.Dispatch<React.SetStateAction<'users' | 'me'>>;
};

export default function ({ setMainSide, setRightSide }: Props): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const user = useAppSelector((state) => state.currentUser.user);

    const chatState = useAppSelector((state) => state.chats);

    const dispatch = useAppDispatch();

    useEffect(() => {
        try {
            if (user?._id) {
                dispatch(getChats(user?._id as string));
            }
        } catch (error) {
            toast.error(error as string);
        }
    }, []);

    return (
        <div className=" px-1 w-sreen md:w-[28%] h-[97%] ">
            <div className="h-[4rem] flex items-center px-2 ">
                <span className="bg-clip-text  text-4xl text-transparent bg-gradient-to-r from-[rgba(12,74,130,1)] to-[rgba(253,216,45,1)] font-bold">
                    Chataw
                </span>
            </div>
            <div className="flex items-center justify-between h-[4rem]">
                <input
                    type="text"
                    id="message"
                    placeholder="Search a chat here ..."
                    className="w-5/6 px-3 py-2 flex text-slate-900 placeholder-gray-300 border border-gray-100 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                />
                <span
                    className="w-1/6 mx-1 py-3 cursor-pointer  bg-sky-200  flex items-center justify-center  text-xs  font-semibold text-sky-800   border border-gray-100 rounded-md  focus:outline-none  focus:ring-sky-100 focus:border-sky-100"
                    onClick={() => {
                        setMainSide('users');
                        setRightSide('users');
                    }}
                >
                    New
                </span>
            </div>
            <div className="h-[calc(100%-8rem)]  flex flex-col items-center  no-scrollbar overflow-y-auto">
                {chatState.chats?.length < 1 && (
                    <div>
                        <span className="h-5 text-lg py-5 text-gray-400">
                            Not chat yet
                        </span>
                    </div>
                )}
                {chatState.chats?.map((chat) => {
                    return (
                        <Chat
                            messages={chat?.messages}
                            name={parseName(chat, user as USER)[0]}
                            id={chat._id as string}
                            newMessageCount={parseNewMessageCount(
                                new Date().toISOString(),
                                chat?.messages,
                            )}
                            lastMessage={parseLastMessage(
                                chat,
                                user?.userName as string,
                            )}
                            showMessages={() => {
                                setMainSide('messages');
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
