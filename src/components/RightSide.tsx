import Users from './Users';
import Profil from './Profil';

type Props = {
    setRightSide: React.Dispatch<React.SetStateAction<'users' | 'me'>>;
    rightSide: 'me' | 'users';
};

export default function ({ setRightSide, rightSide }: Props): JSX.Element {
    return (
        <div className=" md:w-[25%] px-1 h-[97%] ">
            <div className="h-[2.5rem] flex items-center justify-end">
                <span
                    className={`px-3 cursor-pointer ${
                        rightSide == 'me'
                            ? ' text-sky-800 border rounded-t-md border-b-4'
                            : ' text-gray-400  bg-transparent'
                    } font-semibold  py-1 text-xs `}
                    onClick={() => setRightSide('me')}
                >
                    Me
                </span>
                <span
                    className={`px-3 ${
                        rightSide == 'users'
                            ? ' text-sky-800 border rounded-t-md border-b-4'
                            : ' text-gray-400 bg-transparent'
                    } cursor-pointer font-semibold py-1 mx-3  text-xs`}
                    onClick={() => setRightSide('users')}
                >
                    Users
                </span>
            </div>
            <div className="w-full  mb-2 flex flex-col items-center justify-start  h-[calc(100%-2.5rem)]">
                {rightSide == 'me' ? (
                    <Profil />
                ) : rightSide == 'users' ? (
                    <Users />
                ) : null}
            </div>
        </div>
    );
}
