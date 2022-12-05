import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSpinner,
    faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useAppSelector } from '../store/hooks/index';
import UpdatePassword from './UpdatePassword';
import UpdateProfil from './UpdateProfil';

export default function (): JSX.Element {
    const [currentInterface, setCurrentInterface] = useState<
        'profil' | 'update_password' | 'update_profil'
    >('profil');

    const currentUser = useAppSelector((state) => state.currentUser);

    return (
        <>
            {currentInterface == 'update_profil' ? (
                <UpdateProfil setCurrentInterface={setCurrentInterface} />
            ) : currentInterface == 'profil' ? (
                <>
                    <div className=" flex my-3 items-center justify-center">
                        <img
                            src={currentUser.user?.avatar || logo}
                            className="h-[10rem] object-cover  rounded-full border w-[10rem]"
                            alt=""
                        />
                    </div>

                    <div className="flex my-3 flex-col px-1 items-start w-full ">
                        <span className="font-semibold text-slate-900">
                            {currentUser.user?.firstName}{' '}
                            {currentUser.user?.lastName}
                        </span>
                        <span className="font-light text-sm text-gray-400">
                            {currentUser.user?.email}
                        </span>
                        <span className=" text-gray-400 font-medium">
                            {currentUser.user?.userName}
                        </span>
                        <span className=" font-light my-2 text-slate-900 text-sm">
                            {currentUser.user?.bio}
                        </span>
                    </div>
                    <div className="w-full flex items-center justify-around">
                        <button
                            onClick={() => setCurrentInterface('update_profil')}
                            className=" w-9/12 p-2 text-white bg-sky-700 rounded-md hover:bg-sky-800  focus:bg-sky-700 focus:outline-none"
                        >
                            {currentUser.loading ? (
                                <FontAwesomeIcon
                                    className=" animate-spin"
                                    icon={faSpinner}
                                />
                            ) : (
                                'Edit your profil'
                            )}
                        </button>
                        <FontAwesomeIcon
                            onClick={() => {
                                window.location.reload();
                                localStorage.clear();
                            }}
                            className=" w-1/12 self-start border font-light cursor-pointer h-6 p-2 bg-white text-sky-700 rounded-md  focus:bg-sky-700 focus:outline-none"
                            icon={faArrowRightFromBracket}
                        />
                    </div>
                </>
            ) : currentInterface == 'update_password' ? (
                <UpdatePassword setCurrentInterface={setCurrentInterface} />
            ) : null}
        </>
    );
}
