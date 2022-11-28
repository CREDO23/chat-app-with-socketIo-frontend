import Users from './Users';
import Profil from './Profil';
import { useAppDispatch, useAppSelector } from '../store/hooks/index';
import { getUsers } from '../store/slices/users';
import { useEffect, useState } from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
    setRightSide: React.Dispatch<React.SetStateAction<'users' | 'me'>>;
    setMainSide: React.Dispatch<
        React.SetStateAction<'chats' | 'users' | 'messages' | 'profil'>
    >;
    rightSide: 'me' | 'users';
};

export default function ({
    setRightSide,
    rightSide,
    setMainSide,
}: Props): JSX.Element {
    const dispatch = useAppDispatch();

    const users = useAppSelector((state) => state.users.users);

    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(getUsers({ search }));
    }, [search]);

    return (
        <>
            <div className="h-[2.5rem] flex items-center relative justify-end">
                <span
                    onClick={() => setMainSide('chats')}
                    className="h-[2rem] w-[2rem] flex absolute left-0 md:hidden  items-center justify-center mr-2 bg-sky-800 text-sky-100 p-1 rounded-full"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </span>
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
                    <Users
                        setMainSide={setMainSide}
                        setRightSide={setRightSide}
                        setSearch={setSearch}
                        users={users}
                    />
                ) : null}
            </div>
        </>
    );
}
