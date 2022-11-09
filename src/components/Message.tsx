import { parseDate } from '../utils/parser/index';
import type Message from '../types/message';

export default function ({
    isForeign,
    isPrivate,
    time,
    content,
    sender,
}: Message): JSX.Element {
    const timeParsed = parseDate(time);

    return (
        <div className="w-[16rem] relative rounded-md flex flex-col items-center bg-white justify-between ">
            {!isPrivate && (
                <div className="mx-1 text-xs text-gray-500 self-start">
                    {sender}
                </div>
            )}
            <div className="px-1 w-full my-1">{content}</div>
            <div className="mx-1  text-gray-500 text-xs self-end">
                <span className="mx-1">{timeParsed.hour}</span>
                {':'}
                <span className="mx-1">{timeParsed.minute}</span>
            </div>
            {isForeign ? (
                <span className="h-0 w-0 absolute border-[8px] border-white border-l-transparent  border-t-transparent border-solid  left-[-12px] bottom-0  bg-transprent"></span>
            ) : (
                <span className="h-0 w-0 absolute border-[8px] border-white border-r-transparent  border-t-transparent border-solid right-[-12px] bottom-0  bg-transprent"></span>
            )}
        </div>
    );
}
