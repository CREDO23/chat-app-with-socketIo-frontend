import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function (): JSX.Element {
    const [update, setUpdate] = useState<boolean>(false);

    return (
        <>
            {update ? (
                <div className="flex flex-col items-start">
                    <div className="relative self-center flex my-3 items-center justify-center">
                        <img
                            src={logo}
                            className="h-[10rem] rounded-full border w-[10rem]"
                            alt=""
                        />
                        <FontAwesomeIcon
                            className=" cursor-pointer bottom-5 right-1 absolute rounded-full border p-2  text-sky-800  bg-sky-100"
                            icon={faPen}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="small-input"
                            className="block my-1 text-sm font-medium text-gray-500 dark:text-gray-300"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            id="small-input"
                            className="w-full px-3 py-1  text-slate-900 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="small-input"
                            className="block my-1 text-sm text-gray-500 font-mediumtext-gray-500 dark:text-gray-300"
                        >
                            LastName
                        </label>
                        <input
                            type="text"
                            id="small-input"
                            className="w-full px-3 py-1  text-slate-900 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="small-input"
                            className="block my-1 text-sm font-medium text-gray-500 dark:text-gray-300"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            id="small-input"
                            className="w-full px-3 py-1  text-slate-900 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="small-input"
                            className="block my-1 text-sm font-medium text-gray-500 dark:text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            type="text"
                            id="small-input"
                            className="w-full px-3 py-1  text-slate-900 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="large-input"
                            className="block my-1 text-sm font-medium text-gray-500 dark:text-gray-300"
                        >
                            Bio
                        </label>
                        <textarea
                            cols={21}
                            rows={4}
                            className="w-full px-3 py-1 text-slate-900 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                        />
                    </div>

                    <button
                        onClick={() => setUpdate(true)}
                        type="submit"
                        className=" self-center my-3 w-11/12 p-2 text-white bg-sky-700 rounded-md hover:bg-sky-800  focus:bg-sky-700 focus:outline-none"
                    >
                        Save modifications
                    </button>
                </div>
            ) : (
                <>
                    <div className=" flex my-3 items-center justify-center">
                        <img
                            src={logo}
                            className="h-[10rem] rounded-full border w-[10rem]"
                            alt=""
                        />
                    </div>

                    <div className="flex my-3 flex-col px-1 items-start w-full ">
                        <span className="font-semibold text-slate-900">
                            BAKERA Thierry
                        </span>
                        <span className="font-light text-gray-400">
                            bakerathierry@gmail.com
                        </span>
                        <span className=" text-gray-400 font-medium">
                            Credo23
                        </span>
                        <span className=" font-light my-2 text-slate-900 text-sm">
                            Developeur Web FullStack . My favorites languages
                            are TypeScript and JavaScript . I'm a leaner at Goma
                            Digital Academy
                        </span>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <button
                            onClick={() => setUpdate(true)}
                            type="submit"
                            className=" w-11/12 p-2 text-white bg-sky-700 rounded-md hover:bg-sky-800  focus:bg-sky-700 focus:outline-none"
                        >
                            Edit your Profile
                        </button>
                    </div>
                </>
            )}
        </>
    );
}
