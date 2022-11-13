import UserItem from '../types/props/userItem';
import logo from '../assets/logo.png';
import { parseContent } from '../utils/parser/index';

export default function ({ online, userName }: UserItem): JSX.Element {
    return (
        <div className="w-full cursor-pointer my-1 bg-white px-2 h-[3.5rem] rounded flex items-center">
            <span className="relative h-[3rem] mr-1  w-[3rem]">
                <img className=" border  rounded-full" src={logo} alt="" />
                {online && (
                    <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                )}
            </span>

            <div className=" w-[14rem] ">
                <div className="text-sm flex flex-col items-start justify-between  text-slate-900">
                    <p> {parseContent(userName, 15)}</p>
                    <p className="text-gray-400 font-light text-xs">
                        bakerathierry@gmail.com
                    </p>
                </div>
            </div>
        </div>
    );
}
