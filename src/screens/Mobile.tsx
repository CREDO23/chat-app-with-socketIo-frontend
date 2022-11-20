import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPaperPlane,
    faDiamond,
    faArrowLeft,
    faChevronDown,
    faMessage,
    faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import UserChatList from '../components/UserChatList';
import Users from '../components/Users';
import LeftSide from '../components/LeftSide';
import Profil from '../components/Profil';
import { useAppSelector, useAppDispatch } from '../store/hooks/index';
import { parseMessage, parseRecipient } from '../utils/parser/message';
import type USER from '../types/user';
import { getUsers } from '../store/slices/users';
import homeImage from '../assets/home.svg';
import { parseName } from '../utils/parser/chat';
import type Chat from '../types/chat';
import { setNewMessage, newChat, newMessage } from '../store/slices/chats';
import React from 'react';

 function mobile (): JSX.Element {
    const [content, setContent] = useState<'messages' | 'participants'>(
        'messages',
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [rightSide, setRightSide] = useState<'me' | 'users'>('me');

    const [mainSide, setMainSide] = useState<
        'chats' | 'users' | 'messages' | 'profil'
    >('chats');

    const [search, setSearch] = useState('');

    const messagesDiv = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (content == 'messages') {
            messagesDiv.current?.scrollTo({
                behavior: 'auto',
                top: messagesDiv.current.scrollHeight,
            });
        } else if (content == 'participants') {
            messagesDiv.current?.scrollTo({
                behavior: 'auto',
                top: 0,
            });
        }
    }, [content, content, mainSide]);

    const dispatch = useAppDispatch();

    const users = useAppSelector((state) => state.users.users);

    useEffect(() => {
        dispatch(getUsers({ search }));
    }, [search]);

    const [chevronDown, setChevronDonw] = useState<boolean>(false);

    const [message, setMessage] = useState<string>('');

    const chats = useAppSelector((state) => state.chats);
    const user = useAppSelector((state) => state.currentUser.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            navigate('/');
        }
    }, []);

    return (
        <div
            onClick={() => setContent('messages')}
            className=" md:hidden w-screen relative flex-col  pt-2 bg-white items-center flex h-full"
        >
            {mainSide == 'chats' ? (
                <LeftSide
                    setRightSide={setRightSide}
                    setMainSide={setMainSide}
                />
            ) : mainSide == 'messages' ? (
                <>
                    {!chats.currentChat?.messages ? (
                        <div className="md:w-[60%] bg-transparent h-[97%] rounded-md flex flex-col items-center justify-center">
                            <img
                                src={homeImage}
                                className="h-48 w-48"
                                alt="home"
                            />
                            <span
                                className="px-5 mx-1 py-3 cursor-pointer  bg-sky-200  flex items-center justify-center  text-xs  font-semibold text-sky-800   border border-gray-100 rounded-md  focus:outline-none  focus:ring-sky-100 focus:border-sky-100"
                                onClick={() => {
                                    setMainSide('users');
                                    setRightSide('users');
                                }}
                            >
                                Start a chat
                            </span>
                        </div>
                    ) : (
                        <div className="md:w-[65%] bg-[#e9effc] h-full rounded-md">
                            <div className="h-[4rem] border-b-2 px-2  flex items-center justify-between">
                                <FontAwesomeIcon
                                    onClick={() => setMainSide('chats')}
                                    className="p-3 rounded-full bg-sky-800 text-sky-100"
                                    icon={faArrowLeft}
                                />
                                <div className="w-3/5 flex items-center justify-start ">
                                    <img
                                        className="h-[3rem] cursor-pointer  w-[3rem] rounded-full border"
                                        src={logo}
                                        alt=""
                                    />
                                    {chats.currentChat && (
                                        <>
                                            <p className="text-sky-900">
                                                {
                                                    parseName(
                                                        chats.currentChat,
                                                        user as USER,
                                                    )[0]
                                                }
                                            </p>
                                        </>
                                    )}
                                </div>

                                <div className=" flex items-center justify-end h-full w-1/5">
                                    <span
                                        className={`px-3 cursor-pointer ${
                                            content == 'messages'
                                                ? ' text-sky-800  bg-sky-200'
                                                : ' text-gray-400 bg-transparent'
                                        } font-semibold py-1 text-xs border rounded-lg`}
                                        onClick={() => setContent('messages')}
                                    >
                                        <FontAwesomeIcon icon={faMessage} />
                                    </span>
                                    <span
                                        className={`px-3 ${
                                            content == 'participants'
                                                ? ' text-sky-800  bg-sky-200'
                                                : ' text-gray-400 bg-transparent'
                                        } cursor-pointer font-semibold py-1 mx-3  text-xs border rounded-3xl`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setContent('participants');
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setContent('participants');
                                            }}
                                            icon={faUserFriends}
                                        />
                                    </span>
                                </div>
                            </div>
                            <div
                                ref={messagesDiv}
                                onScroll={(e) => {
                                    if (e.currentTarget.scrollTop < 50) {
                                        setChevronDonw(true);
                                    } else {
                                        setChevronDonw(false);
                                    }
                                }}
                                className="h-[calc(100%-7.5rem)] no-scrollbar overflow-y-auto p-4 flex flex-col "
                            >
                                {content == 'participants' && (
                                    <UserChatList
                                        users={
                                            chats.currentChat.users as USER[]
                                        }
                                    />
                                )}
                                {chats.currentChat?.messages.map((message) => {
                                    const parsedMessage = parseMessage(
                                        message,
                                        user?.userName as string,
                                        chats.currentChat as Chat,
                                    );
                                    return (
                                        <Message
                                            key={message.id}
                                            time={parsedMessage.time}
                                            isForeign={parsedMessage.isForeign}
                                            isPrivate={parsedMessage.isPrivate}
                                            content={parsedMessage.content}
                                            sender={parsedMessage.sender}
                                        />
                                    );
                                })}
                            </div>
                            <div className="h-[3.5rem] items-center relative flex p-1 border-t-2 ">
                                <input
                                    type="text"
                                    id="message"
                                    placeholder="Here your message ..."
                                    className="w-11/12 px-3 py-2 flex text-slate-900 placeholder-gray-300 border border-gray-100 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                                />
                                <FontAwesomeIcon
                                    className="w-1/12 cursor-pointer text-sky-600"
                                    onClick={() => {
                                        dispatch(
                                            setNewMessage({
                                                sender: user as USER,
                                                content: message,
                                                updatedAt:
                                                    new Date().toISOString(),
                                            }),
                                        );
                                        if (!chats.currentChat?.messages[0]) {
                                            dispatch(
                                                newChat({
                                                    name: chats.currentChat
                                                        ?.name as string,
                                                    users: chats.newChat
                                                        ?.users as string[],
                                                    message: {
                                                        sender: user?._id as string,
                                                        content: message,
                                                        recipient:
                                                            parseRecipient(
                                                                chats.newChat
                                                                    ?.users as USER[],
                                                                user?.userName as string,
                                                            ),
                                                    },
                                                }),
                                            );
                                        } else {
                                            dispatch(
                                                newMessage({
                                                    id: chats.currentChat._id,
                                                    message: {
                                                        sender: user?._id,
                                                        content: message,
                                                    },
                                                }),
                                            );
                                        }

                                        setTimeout(() => setMessage(''), 1000);
                                    }}
                                    icon={faPaperPlane}
                                    size={'2x'}
                                />
                                {chevronDown && content == 'messages' && (
                                    <FontAwesomeIcon
                                        onClick={() =>
                                            messagesDiv.current?.scrollTo({
                                                behavior: 'auto',
                                                top: messagesDiv.current
                                                    .scrollHeight,
                                            })
                                        }
                                        className="text-sky-700 absolute cursor-pointer right-3 animate-bounce bg-white -top-[4rem] rounded-full p-3 border"
                                        icon={faChevronDown}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </>
            ) : mainSide == 'users' ? (
                <Users setSearch={setSearch} users={users} />
            ) : mainSide == 'profil' ? (
                <Profil />
            ) : null}
            <span className="absolute md:hidden top-4 h-12 w-12 flex items-center justify-center text-sky-100 p-1 rounded-full right-5">
                {mainSide == 'chats' && (
                    <span
                        className="relative"
                        onClick={() => setMainSide('profil')}
                    >
                        <img
                            className="p-1 w-10 h-10 border rounded-full  dark:ring-gray-500"
                            src={logo}
                            alt="Bordered avatar"
                        />
                        <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                    </span>
                )}
            </span>
            {mainSide != 'messages' && (
                <span
                    onClick={() => {
                        mainSide == 'chats'
                            ? setMainSide('users')
                            : setMainSide('chats');
                    }}
                    className="absolute md:hidden 
                        bottom-4 right-4
                } h-12 w-12 flex items-center justify-center bg-sky-800 text-sky-100 p-1 rounded-full"
                >
                    <FontAwesomeIcon
                        icon={
                            mainSide == 'users' || mainSide == 'profil'
                                ? faArrowLeft
                                : faDiamond
                        }
                    />
                </span>
            )}
        </div>
    );
}


export default React.memo(mobile)
