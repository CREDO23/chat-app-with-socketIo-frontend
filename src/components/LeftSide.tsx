import chats from '../../fakedata/chat.json';
import Chat from '../components/Chat';

type Props = {
    setMainSide: React.Dispatch<
        React.SetStateAction<'users' | 'profil' | 'chats' | 'messages'>
    >;
    setRightSide: React.Dispatch<React.SetStateAction<'users' | 'me'>>;
};

export default function ({ setMainSide, setRightSide }: Props): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

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
            <div className="h-[calc(100%-8rem)] flex flex-col items-center no-scrollbar overflow-y-auto">
                {chats.map((chat) => {
                    return (
                        <Chat
                            showMessages={setMainSide}
                            key={chat.name}
                            newMessageCount={chat.newMessageCount}
                            name={chat.name}
                            messages={chat.messages}
                            lastMessage={chat.messages[0]}
                        />
                    );
                })}
            </div>
        </div>
    );
}
