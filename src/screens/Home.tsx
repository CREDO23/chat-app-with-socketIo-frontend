import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faImage } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import messages from '../../fakedata/message.json';
import chats from '../../fakedata/chat.json';
import userItems from '../../fakedata/userItem.json';
import Message from '../components/Message';
import Chat from '../components/Chat';
import UserItem from '../components/UserItem';

export default function (): JSX.Element {
    const [content, setContent] = useState<'messages' | 'participants'>(
        'messages',
    );

    const [leftSide, setLeftSide] = useState<'me' | 'users'>('me');

    return (
        <div className="w-full  bg-white items-center flex h-full">
            <div className=" px-1 w-[25%] h-[97%] ">
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
                    <input
                        type="text"
                        id="message"
                        value={'New'}
                        className="w-1/6 mx-1 py-3 cursor-pointer  bg-sky-200 flex text-xs  font-semibold text-sky-800   border border-gray-100 rounded-md  focus:outline-none  focus:ring-sky-100 focus:border-sky-100"
                    />
                </div>
                <div className="h-[calc(100%-8rem)] no-scrollbar overflow-y-auto">
                    {chats.map((chat) => {
                        return (
                            <Chat
                                newMessageCount={chat.newMessageCount}
                                name={chat.name}
                                messages={chat.messages}
                                lastMessage={chat.messages[0]}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="w-[65%] bg-[#e9effc] h-[97%] rounded-md">
                <div className="h-[4rem] border-b-2 px-2  flex items-center justify-between">
                    <div className="w-3/5 flex items-center justify-start ">
                        <img
                            className="h-[3rem] cursor-pointer  w-[3rem] rounded-full border"
                            src={logo}
                            alt=""
                        />
                        <p className="mx-3">Credo23</p>
                    </div>

                    <div className=" flex items-center justify-end h-full w-2/5">
                        <span
                            className={`px-3 cursor-pointer ${
                                content == 'messages'
                                    ? ' text-sky-800  bg-sky-200'
                                    : ' text-gray-400 bg-transparent'
                            } font-semibold py-1 text-xs border rounded-lg`}
                            onClick={() => setContent('messages')}
                        >
                            Messages
                        </span>
                        <span
                            className={`px-3 ${
                                content == 'participants'
                                    ? ' text-sky-800  bg-sky-200'
                                    : ' text-gray-400 bg-transparent'
                            } cursor-pointer font-semibold py-1 mx-3  text-xs border rounded-3xl`}
                            onClick={() => setContent('participants')}
                        >
                            Participants
                        </span>
                    </div>
                </div>
                <div className="h-[calc(100%-7.5rem)] no-scrollbar overflow-y-auto p-4 flex flex-col ">
                    {messages.map((message) => {
                        return (
                            <Message
                                time={message.time}
                                isForeign={message.isForeign}
                                isPrivate={message.isPrivate}
                                content={message.content}
                                sender={message.sender}
                            />
                        );
                    })}
                </div>
                <div className="h-[3.5rem] items-center flex p-1 border-t-2 ">
                    <input
                        type="text"
                        id="message"
                        placeholder="Here your message ..."
                        className="w-11/12 px-3 py-2 flex text-slate-900 placeholder-gray-300 border border-gray-100 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                    />
                    <FontAwesomeIcon
                        className="w-1/12 cursor-pointer text-sky-600"
                        icon={faPaperPlane}
                        size={'2x'}
                    />
                </div>
            </div>
            <div className=" w-[25%] px-1 h-[97%] ">
                <div className="h-[2.5rem] flex items-center justify-end">
                    <span
                        className={`px-3 cursor-pointer ${
                            leftSide == 'me'
                                ? ' text-sky-800 border rounded-t-md border-b-4'
                                : ' text-gray-400  bg-transparent'
                        } font-semibold  py-1 text-xs `}
                        onClick={() => setLeftSide('me')}
                    >
                        Me
                    </span>
                    <span
                        className={`px-3 ${
                            leftSide == 'users'
                                ? ' text-sky-800 border rounded-t-md border-b-4'
                                : ' text-gray-400 bg-transparent'
                        } cursor-pointer font-semibold py-1 mx-3  text-xs`}
                        onClick={() => setLeftSide('users')}
                    >
                        Users
                    </span>
                </div>
                <div className="w-full  no-scrollbar overflow-y-auto mb-2 flex flex-col items-center justify-start  h-[calc(100%-2.5rem)]">
                    {leftSide == 'me' ? (
                        <>
                            <div className="relative flex my-3 items-center justify-center">
                                <img
                                    src={logo}
                                    className="h-[10rem] rounded-full border w-[10rem]"
                                    alt=""
                                />
                                <FontAwesomeIcon
                                    className=" cursor-pointer bottom-5 right-1 absolute rounded-full border p-2  text-sky-800  bg-sky-100"
                                    icon={faImage}
                                />
                            </div>

                            <div className="flex my-3 flex-col px-1 items-start w-full ">
                                <span className="font-semibold text-slate-900">
                                    BAKERA Thierry
                                </span>
                                <span className=" text-gray-400 font-medium">
                                    Credo23
                                </span>
                                <span className=" font-light my-2 text-slate-900 text-sm">
                                    Developeur Web FullStack . My favorites
                                    languages are TypeScript and JavaScript .
                                    I'm a leaner at Goma Digital Academy
                                </span>
                            </div>
                            <div className="w-full flex items-center justify-center">
                                <button
                                    type="submit"
                                    className=" w-full p-2 text-white bg-sky-700 rounded-md hover:bg-sky-800  focus:bg-sky-700 focus:outline-none"
                                >
                                    Edit your Profile
                                </button>
                            </div>
                        </>
                    ) : leftSide == 'users' ? (
                        <>
                            <div>
                                <input
                                    type="text"
                                    id="message"
                                    placeholder="Search a user here ..."
                                    className="w-full px-3 py-2 flex text-slate-900 placeholder-gray-300 border border-gray-100 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                                />
                            </div>
                            <div>
                                {userItems.map((item) => {
                                    return (
                                        <UserItem
                                            imageProfile={item.imageProfile}
                                            online={item.online}
                                            userName={item.userName}
                                        />
                                    );
                                })}
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
