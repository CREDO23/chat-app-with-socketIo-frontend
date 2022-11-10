import UserItem from '../types/props/userItem';
import logo from '../assets/logo.png';
import { parseContent } from '../utils/parser/index';

export default function ({ online, userName }: UserItem): JSX.Element {
    return (
        <div className="w-[20rem] hover:border cursor-pointer my-1 bg-white px-2 h-[3rem] rounded flex items-center">
            <img
                className="h-[3rem]  w-[3rem]  rounded-full"
                src={logo}
                alt=""
            />
            <div className=" w-[18rem] ml-auto flex items-center justify-between">
                <p className="text-sm  text-slate-900">
                    {parseContent(userName)}
                </p>
                <p className="text-xs font-medium text-green-900">
                    {online && 'online'}
                </p>
            </div>
        </div>
    );
}
