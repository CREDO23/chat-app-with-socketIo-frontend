import logo from '../assets/logo.png';
import type Message from '../types/message';
import type Chat from '../types/chat';

export default function ({ isNew }: Chat): JSX.Element {
    return (
        <div className="w-[23rem] bg-gray-400 px-2 h-[4rem] rounded flex items-center">
            <img
                className="h-[3rem]  w-[3rem]  rounded-full"
                src={logo}
                alt=""
            />
            <div className="flex h-full pr-1 ml-auto justify-around items-center flex-col">
                <div className="flex w-[18rem] justify-between item-center">
                    <h2 className="font-semibold">Jethron</h2>
                    <div
                        className={`text-sm ${
                            isNew ? ' text-green-900' : 'text-white'
                        }`}
                    >
                        <span>12</span>
                        {':'}
                        <span>05</span>
                    </div>
                </div>
                <div className="self-start w-full flex items-center justify-between">
                    <p>Nisawa man ?</p>
                    {isNew ? (
                        <span className="bg-green-900 text-white text-sm flex items-center justify-center rounded-full h-[1.5rem] w-[1.5rem]">
                            2
                        </span>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
