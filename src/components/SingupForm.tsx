import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { singup } from '../store/slices/currentUser';
import toast from '../utils/toasty/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isFill, isMatch } from '../utils/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

type Form = 'singin' | 'singup';
type Props = {
    setForm: React.Dispatch<React.SetStateAction<Form>>;
};

export default function ({ setForm }: Props): JSX.Element {
    const currentUser = useAppSelector((state) => state.currentUser);
    const dispatch = useAppDispatch();

    const [singupForm, setSingupForm] = useState({
        userName: '',
        password: '',
        email: '',
        confirmPassword: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        input: 'userName' | 'email' | 'confirmPassword' | 'password',
    ): void => {
        setSingupForm({
            ...singupForm,
            [input]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await isFill(singupForm);

            await isMatch(singupForm.confirmPassword, singupForm.password);

            dispatch(
                singup({
                    userName: singupForm.userName,
                    password: singupForm.password,
                    email: singupForm.email,
                }),
            );
        } catch (error) {
            toast.error(error as string);
        }
    };

    return (
        <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
            noValidate
            className="w-full"
        >
            <div className=" flex flex-col items-start my-4">
                <label className=" text-slate-900" htmlFor="userName">
                    User Name
                </label>
                <input
                    type="text"
                    id="userName"
                    placeholder="Credo243"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(e, 'userName')
                    }
                    className="w-full px-3 py-2  text-slate-900 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                />
            </div>

            <div className=" flex flex-col items-start my-4">
                <label className=" text-slate-900" htmlFor="email">
                    Email adress
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder="bakerathierry@gmail.com"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(e, 'email')
                    }
                    className="w-full px-3 py-2  text-slate-900 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                />
            </div>

            <div className=" flex flex-col items-start my-4">
                <label className=" text-slate-900" htmlFor="password">
                    Passowrd
                </label>
                <input
                    type="password"
                    id="password"
                    placeholder="***************"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(e, 'password')
                    }
                    className="w-full px-3 py-2  text-slate-900 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                />
            </div>

            <div className=" flex flex-col items-start my-4">
                <label className=" text-slate-900" htmlFor="confirmPassword">
                    Confirm password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="***************"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(e, 'confirmPassword')
                    }
                    className="w-full px-3 py-2 text-slate-900 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                />
            </div>

            <div className=" my-3 font-light text-xs mx-2 flex items-center justify-end">
                <span className=" text-slate-900">
                    Already have an account ?
                </span>
                <span
                    onClick={() => {
                        currentUser.loading ? null : setForm('singin');
                    }}
                    className=" font-medium ml-2 cursor-pointer text-[rgba(253,216,45,1)]"
                >
                    Sing in
                </span>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={currentUser.loading}
                    className="w-full px-2 py-4 text-white bg-sky-900 rounded-md hover:bg-sky-800  focus:bg-sky-700 focus:outline-none"
                >
                    {currentUser.loading ? (
                        <FontAwesomeIcon
                            className=" animate-spin"
                            icon={faSpinner}
                        />
                    ) : (
                        'SING UP'
                    )}
                </button>
            </div>
            <ToastContainer limit={1} />
        </form>
    );
}
