import logo from '../assets/logo.png';
import type Chat from '../types/props/chat';
import { parseDate, parseContent } from '../utils/parser/index';

export default function ({
    newMessageCount,
    name,
    lastMessage,
}: Chat): JSX.Element {
    const dateParsed = parseDate(lastMessage.time);

    return (
        <div
            className={`w-[23rem] cursor-pointer my-1 ${
                newMessageCount ? ' bg-slate-200' : 'bg-white'
            } px-2 h-[4rem] rounded flex items-center`}
        >
            <img
                className="h-[3rem]  w-[3rem]  rounded-full"
                src={logo}
                alt=""
            />
            <div className="flex h-full pr-1 ml-auto justify-around items-center flex-col">
                <div className="flex w-[18rem] justify-between item-center">
                    <h2 className=" text-slate-900 font-semibold">
                        {parseContent(name)}
                    </h2>
                    <div
                        className={`text-sm ${
                            newMessageCount
                                ? ' text-green-900'
                                : ' text-gray-300'
                        }`}
                    >
                        {dateParsed.day == 'Today' ? (
                            <span>{`${dateParsed.hour} : ${dateParsed.minute}`}</span>
                        ) : (
                            <span>{`${dateParsed.month}/${dateParsed.day}/${dateParsed.year}`}</span>
                        )}
                    </div>
                </div>
                <div className="self-start w-full flex items-center justify-between">
                    <p className="text-sm text-slate-900">
                        {parseContent(lastMessage.content)}
                    </p>
                    {newMessageCount ? (
                        <span className="bg-green-900 text-white text-xs flex items-center justify-center rounded-full h-[1.2rem] w-[1.2rem]">
                            {newMessageCount}
                        </span>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
