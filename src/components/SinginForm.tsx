import { useState } from 'react';
import { singin } from '../store/slices/currentUser';
import { useAppDispatch, useAppSelector } from '../store/hooks/index';
import toast from '../utils/toasty/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isFill } from '../utils/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

type Form = 'singin' | 'singup';
type Props = {
    setForm: React.Dispatch<React.SetStateAction<Form>>;
};

export default function ({ setForm }: Props): JSX.Element {
    const isloading = useAppSelector((state) => state.currentUser.loading);
    const dispatch = useAppDispatch();
    const [signinForm, setSinginForm] = useState({
        userName: '',
        password: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        input: 'userName' | 'password',
    ): void => {
        setSinginForm({
            ...signinForm,
            [input]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await isFill(signinForm);

            dispatch(singin(signinForm));
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
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    placeholder="********************"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(e, 'password')
                    }
                    className="w-full px-3 py-2  text-slate-900 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                />
            </div>
            <div className=" my-3 mx-2 font-light text-xs flex items-center justify-end">
                <span className=" text-slate-900">Don't have an account ?</span>
                <span
                    onClick={() => {
                        isloading ? null : setForm('singup');
                    }}
                    className=" font-medium ml-2 cursor-pointer text-[rgba(253,216,45,1)]"
                >
                    Sing up
                </span>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isloading}
                    className=" w-full px-2 py-4 text-white bg-sky-900 rounded-md hover:bg-sky-800  focus:bg-sky-700 focus:outline-none"
                >
                    {isloading ? (
                        <FontAwesomeIcon
                            className=" animate-spin"
                            icon={faSpinner}
                        />
                    ) : (
                        'SING IN'
                    )}
                </button>
            </div>
            <ToastContainer limit={1} />
        </form>
    );
}
