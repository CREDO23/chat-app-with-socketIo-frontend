import UserItem from '../types/props/userItem';
import logo from '../assets/logo.png';
import 'flowbite-react';
import { parseContent } from '../utils/parser/index';

export default function ({ online, userName }: UserItem): JSX.Element {
    return (
        <div className="w-full hover:border cursor-pointer my-1 bg-white px-2 h-[4rem] rounded flex items-center">
            <img
                className="h-[3rem]  w-[3rem]  rounded-full"
                src={logo}
                alt=""
            />
      
            <div className=" w-[16rem] ml-auto flex items-center justify-between">
                <div className="text-sm  flex flex-col items-start justify-between text-slate-900">
                    <p>{parseContent(userName, 15)}</p>{' '}
                    <p className=" text-gray-400 font-light">
                        bakerathierry@gmail.com
                    </p>
                </div>
                <p className="text-xs font-medium text-green-900">
                    {online && 'online'}
                </p>
            </div>
        </div>
    );
}
