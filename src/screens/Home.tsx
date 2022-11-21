import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState, useEffect, useContext } from 'react';
import type USER from '../types/user';
import Message from '../components/Message';
import UserChatList from '../components/UserChatList';
import Mobile from './Mobile';
import LeftSide from '../components/LeftSide';
import RightSide from '../components/RightSide';
import { ToastContainer } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../store/hooks/index';
import { parseMessage, parseRecipient } from '../utils/parser/message';
import { parseName } from '../utils/parser/chat';
import homeImage from '../assets/home.svg';
import {
    setNewMessage,
    newChat,
    newMessage,
    newMsg,
} from '../store/slices/chats';
import type Chat from '../types/chat';
import { useNavigate } from 'react-router-dom';
import socketContext from '../context';
import React from 'react';

function home(): JSX.Element {
    const [content, setContent] = useState<'messages' | 'participants'>(
        'messages',
    );

    const [rightSide, setRightSide] = useState<'me' | 'users'>('me');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [mainSide, setMainSide] = useState<
        'chats' | 'users' | 'messages' | 'profil'
    >('chats');

    const messagesDiv = useRef<HTMLDivElement>(null);

    const chats = useAppSelector((state) => state.chats);
    const user = useAppSelector((state) => state.currentUser.user);
    const dispatch = useAppDispatch();

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
    }, [content, chats.currentChat]);

    const [chevronDown, setChevronDonw] = useState<boolean>(false);

    const [message, setMessage] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            navigate('/');
        }
    }, []);

    const io = useContext(socketContext);

    const socket = io?.getSocket();

    useEffect(() => {
        if (socket) {
            socket.on('newChat', (chat) => {
                dispatch(newMsg(chat));
            });
        }
    }, [socket]);

    return (
        <>
            <div className="w-full md:w-[1360px] hidden  bg-white items-center md:flex h-full">
                <LeftSide
                    setRightSide={setRightSide}
                    setMainSide={setMainSide}
                />
                {!chats.currentChat?.messages ? (
                    <div className="md:w-[60%] bg-transparent h-[97%] rounded-md flex flex-col items-center justify-center">
                        <img src={homeImage} className="h-48 w-48" alt="home" />
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
                    <div
                        onClick={() => setContent('messages')}
                        className="md:w-[60%] bg-[#e9effc] h-[97%] rounded-md"
                    >
                        <div className="h-[4rem] border-b-2 px-2  flex items-center justify-between">
                            <div className="w-3/5 flex items-center justify-start ">
                                <img
                                    className="h-[3rem] cursor-pointer  w-[3rem] rounded-full border"
                                    src={logo}
                                    alt=""
                                />
                                <div className="flex mx-3 flex-col items-start justify-between">
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
                                    } cursor-pointer relative font-semibold py-1 mx-3  text-xs border rounded-3xl`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setContent('participants');
                                        socket?.emit('salut');
                                    }}
                                >
                                    Participants
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
                            className="h-[calc(100%-7.5rem)] relative no-scrollbar overflow-y-auto  p-4 flex flex-col "
                        >
                            {content == 'participants' && (
                                <UserChatList
                                    users={chats.currentChat.users as USER[]}
                                />
                            )}
                            {chats.currentChat?.messages.map((message) => {
                                const parsedMessage = parseMessage(
                                    message,
                                    user?.userName as string,
                                    chats.currentChat as Chat,
                                );
                                if (message.content) {
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
                                }
                            })}
                        </div>
                        <div className="h-[3.5rem] items-center relative flex p-1 border-t-2 ">
                            <input
                                type="text"
                                value={message}
                                id="message"
                                onChange={(e) => setMessage(e.target.value)}
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
                                            updatedAt: new Date().toISOString(),
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
                                                    recipient: parseRecipient(
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
                                    onClick={() => {
                                        messagesDiv.current?.scrollTo({
                                            behavior: 'auto',
                                            top: messagesDiv.current
                                                .scrollHeight,
                                        });
                                    }}
                                    className="text-sky-700 absolute cursor-pointer right-3 animate-bounce bg-white -top-[4rem] rounded-full p-3 border"
                                    icon={faChevronDown}
                                />
                            )}
                        </div>
                    </div>
                )}

                <RightSide rightSide={rightSide} setRightSide={setRightSide} />
            </div>
            <Mobile />
            <ToastContainer />
        </>
    );
}

export default React.memo(home);
