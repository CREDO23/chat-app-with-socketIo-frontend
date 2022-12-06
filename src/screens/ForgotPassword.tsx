import { faArrowLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import toast from '../utils/toasty';
import { isFill } from '../utils/validation';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { forgotPassword } from '../store/slices/currentUser';

export default function (): JSX.Element {
    const [forgotPasswordForm, setForgotPasswordForm] = useState({
        userName: '',
    });

    const currentUser = useAppSelector((state) => state.currentUser);

    const dispatch = useAppDispatch();

    const heandleForgotForm = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: string,
    ) => {
        setForgotPasswordForm({
            ...forgotPasswordForm,
            [field]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await isFill(forgotPasswordForm);

            dispatch(forgotPassword(forgotPasswordForm));
        } catch (error) {
            toast.error(error as string);
        }
    };

    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            className=" text-textbleu w-11/12 md:w-6/12 "
            noValidate
        >
            <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-textbleu">
                    Please , entrer your user name ! You will recieve a recovery
                    link in your email inbox
                </label>
                <input
                    type="email"
                    name="userName"
                    placeholder="Credo23"
                    onChange={(e) => heandleForgotForm(e, 'userName')}
                    required
                    className="w-full px-3 py-2  text-slate-900 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                />
            </div>
            <div className="flex items-center mx-2 my-3 justify-end cursor-pointer">
                <Link to="/">
                    <span className=" text-bleu-4">
                        <FontAwesomeIcon icon={faArrowLeft} /> Go to Sign in
                    </span>
                </Link>
            </div>
            <div className="mb-6 flex justify-start">
                <button
                    type="submit"
                    className="w-full md:w-4/12 px-2 py-4 text-white bg-sky-900 rounded-md hover:bg-sky-800  focus:bg-sky-700 focus:outline-none"
                >
                    {currentUser.loading ? (
                        <FontAwesomeIcon
                            className=" animate-spin"
                            icon={faSpinner}
                        />
                    ) : (
                        'Send'
                    )}
                </button>
            </div>
            <ToastContainer />
        </form>
    );
}
