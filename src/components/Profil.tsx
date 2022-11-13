import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

export default function (): JSX.Element {
    return (
        <>
            <div className="relative flex my-3 items-center justify-center">
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

            <div className="flex my-3 flex-col px-1 items-start w-full ">
                <span className="font-semibold text-slate-900">
                    BAKERA Thierry
                </span>
                <span className="font-light text-slate-900">
                    bakerathierry@gmail.com
                </span>
                <span className=" text-gray-400 font-medium">Credo23</span>
                <span className=" font-light my-2 text-slate-900 text-sm">
                    Developeur Web FullStack . My favorites languages are
                    TypeScript and JavaScript . I'm a leaner at Goma Digital
                    Academy
                </span>
            </div>
            <div className="w-full flex items-center justify-center">
                <button
                    type="submit"
                    className=" w-11/12 p-2 text-white bg-sky-700 rounded-md hover:bg-sky-800  focus:bg-sky-700 focus:outline-none"
                >
                    Edit your Profile
                </button>
            </div>
        </>
    );
}
