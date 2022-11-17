import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSpinner } from '@fortawesome/free-solid-svg-icons';
import React, { useRef, useState } from 'react';
import { useAppSelector } from '../store/hooks/index';
import { updateUser } from '../store/slices/currentUser';
import { useAppDispatch } from '../store/hooks/index';
import toast from '../utils/toasty';
import { isFill, isMatch } from '../utils/validation/index';

export default function (): JSX.Element {
    const [update, setUpdate] = useState<boolean>(false);

    const currentUser = useAppSelector((state) => state.currentUser);

    const [updateForm, setUpdateForm] = useState({
        userName: currentUser.user?.userName as string,
        firstName: currentUser.user?.firstName as string,
        lastName: currentUser.user?.lastName as string,
        email: currentUser.user?.email as string,
        bio: currentUser.user?.bio as string,
        password: '',
        confirmPassword: '',
    });

    const profilLink = useRef<HTMLImageElement>(null);

    const dispatch = useAppDispatch();

    const handleUpdateForm = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        input: string,
    ): void => {
        setUpdateForm({ ...updateForm, [input]: e.target.value });
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        e.preventDefault();

        try {
            await isFill(updateForm);

            await isMatch(updateForm.password, updateForm.confirmPassword);

            dispatch(
                updateUser({
                    id: currentUser.user?._id,
                    body: {
                        firstName: updateForm.firstName,
                        lastName: updateForm.lastName,
                        email: updateForm.email,
                        bio: updateForm.bio,
                        password: updateForm.password,
                        avatar: profilLink.current?.src,
                    },
                }),
            );

            setTimeout(() => {
                if (!currentUser.loading) {
                    setUpdate(false);
                }
            }, 2000);
        } catch (error) {
            toast.error(error as string);
        }
    };

    return (
        <>
            {update ? (
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="flex flex-col items-start"
                >
                    <div className="relative self-center flex my-3 items-center justify-center">
                        <img
                            ref={profilLink}
                            src={currentUser.user?.avatar || logo}
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
                            htmlFor="firstName"
                            className="block my-1 text-sm font-medium text-gray-500 dark:text-gray-300"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={updateForm.firstName}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => handleUpdateForm(e, 'firstName')}
                            className="w-full px-3 py-1  text-slate-900 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="lastName"
                            className="block my-1 text-sm text-gray-500 font-mediumtext-gray-500 dark:text-gray-300"
                        >
                            LastName
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={updateForm.lastName}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => handleUpdateForm(e, 'lastName')}
                            className="w-full px-3 py-1  text-slate-900 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block my-1 text-sm font-medium text-gray-500 dark:text-gray-300"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            value={updateForm.email}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => handleUpdateForm(e, 'email')}
                            className="w-full px-3 py-1  text-slate-900 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block my-1 text-sm font-medium text-gray-500 dark:text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => handleUpdateForm(e, 'password')}
                            className="w-full px-3 py-1  text-slate-900 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block my-1 text-sm font-medium text-gray-500 dark:text-gray-300"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => handleUpdateForm(e, 'confirmPassword')}
                            className="w-full px-3 py-1  text-slate-900 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="bio"
                            className="block my-1 text-sm font-medium text-gray-500 dark:text-gray-300"
                        >
                            Bio
                        </label>
                        <textarea
                            cols={21}
                            rows={4}
                            name="bio"
                            value={updateForm.bio}
                            onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>,
                            ) => handleUpdateForm(e, 'bio')}
                            className="w-full px-3 py-1 text-slate-900 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                        />
                    </div>

                    <button
                        type="submit"
                        className=" self-center my-3 w-11/12 p-2 text-white bg-sky-700 rounded-md hover:bg-sky-800  focus:bg-sky-700 focus:outline-none"
                    >
                        {currentUser.loading ? (
                            <FontAwesomeIcon
                                className=" animate-spin"
                                icon={faSpinner}
                            />
                        ) : (
                            'Save modifications'
                        )}
                    </button>
                </form>
            ) : (
                <>
                    <div className=" flex my-3 items-center justify-center">
                        <img
                            src={currentUser.user?.avatar || logo}
                            className="h-[10rem] rounded-full border w-[10rem]"
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
                    <div className="w-full flex items-center justify-center">
                        <button
                            onClick={() => setUpdate(true)}
                            type="submit"
                            className=" w-11/12 p-2 text-white bg-sky-700 rounded-md hover:bg-sky-800  focus:bg-sky-700 focus:outline-none"
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
                    </div>
                </>
            )}
        </>
    );
}
