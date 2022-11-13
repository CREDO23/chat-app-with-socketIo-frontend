import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState, useEffect } from 'react';
import messages from '../../fakedata/message.json';
import Message from '../components/Message';
import UserChatList from '../components/UserChatList';
import Mobile from './Mobile';
import LeftSide from '../components/LeftSide';
import RightSide from '../components/RightSide';

export default function (): JSX.Element {
    const [content, setContent] = useState<'messages' | 'participants'>(
        'messages',
    );

    const [rightSide, setRightSide] = useState<'me' | 'users'>('me');

    const [mainSide, setMainSide] = useState<
        'chats' | 'users' | 'messages' | 'profil'
    >('chats');

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
    }, [content, content]);

    const [chevronDown, setChevronDonw] = useState<boolean>(false);

    return (
        <>
            <div className="w-full md:w-[1360px] hidden  bg-white items-center md:flex h-full">
                <LeftSide
                    setRightSide={setRightSide}
                    setMainSide={setMainSide}
                />
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
                                <p className="text-sky-900">Credo23</p>
                                <p className="text-green-600 text-xs">Online</p>
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
                        className="h-[calc(100%-7.5rem)] relative no-scrollbar overflow-y-auto p-4 flex flex-col "
                    >
                        {content == 'participants' && <UserChatList />}

                        {messages.map((message) => {
                            return (
                                <Message
                                    key={message.time}
                                    time={message.time}
                                    isForeign={message.isForeign}
                                    isPrivate={message.isPrivate}
                                    content={message.content}
                                    sender={message.sender}
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
                            icon={faPaperPlane}
                            size={'2x'}
                        />
                        {chevronDown && content == 'messages' && (
                            <FontAwesomeIcon
                                onClick={() =>
                                    messagesDiv.current?.scrollTo({
                                        behavior: 'auto',
                                        top: messagesDiv.current.scrollHeight,
                                    })
                                }
                                className="text-sky-700 absolute cursor-pointer right-3 animate-bounce bg-white -top-[4rem] rounded-full p-3 border"
                                icon={faChevronDown}
                            />
                        )}
                    </div>
                </div>
                <RightSide rightSide={rightSide} setRightSide={setRightSide} />
            </div>
            <Mobile />
        </>
    );
}
