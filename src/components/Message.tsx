import { parseDate } from '../utils/parser/index';
import type Message from '../types/props/message';

export default function ({
    isForeign,
    isPrivate,
    time,
    content,
    sender,
}: Message): JSX.Element {
    const dateParsed = parseDate(time);

    return (
        <div
            className={` max-w-[16rem] md:max-w-md my-2 border ${
                isForeign ? ' bg-white self-start' : 'bg-slate-300 self-end'
            }  relative rounded-lg flex flex-col items-center justify-between`}
        >
            {isForeign ? (
                !isPrivate ? (
                    <div className="m-1 text-xs text-gray-500 self-start">
                        {sender}
                    </div>
                ) : null
            ) : null}
            <div className="px-2  text-slate-900 text-sm w-full my-1">
                {content}
            </div>
            <div className="mx-2  text-gray-400 text-xs self-end">
                {dateParsed.day == 'Today' ? (
                    <span>{`${dateParsed.hour} : ${dateParsed.minute}`}</span>
                ) : (
                    <span>{`${dateParsed.month}/${dateParsed.day}/${dateParsed.year}`}</span>
                )}
            </div>
            {isForeign ? (
                <span className="h-0 w-0 absolute border-[8px] border-white border-l-transparent  border-t-transparent border-solid  left-[-6px] bottom-0  bg-transprent"></span>
            ) : (
                <span className="h-0 w-0 absolute border-[8px] border-slate-300 border-r-transparent  border-t-transparent border-solid right-[-8px] bottom-0  bg-transprent"></span>
            )}
        </div>
    );
}
