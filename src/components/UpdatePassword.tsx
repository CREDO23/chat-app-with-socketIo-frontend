import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateUser } from '../store/slices/currentUser';
import logo from '../assets/logo.png';

type Props = {
    setCurrentInterface: React.Dispatch<
        React.SetStateAction<'profil' | 'update_password' | 'update_profil'>
    >;
};

export default function ({ setCurrentInterface }: Props): JSX.Element {
    const dispatch = useAppDispatch();

    const currentUser = useAppSelector((state) => state.currentUser);

    return (
        <div>
            <form className="flex flex-col items-start">
                <div className=" self-center flex my-3 items-center justify-center">
                    <img
                        src={currentUser.user?.avatar || logo}
                        className="h-[10rem] object-cover  rounded-full border w-[10rem]"
                        alt=""
                    />
                </div>

                <div>
                    <label
                        htmlFor="newPassword"
                        className="block my-1 text-sm font-medium text-gray-500 dark:text-gray-300"
                    >
                        New password
                    </label>
                    <input
                        type="password"
                        autoComplete="off"
                        autoCorrect="off"
                        name="newPassword"
                        className="w-full px-3 py-1  text-slate-900 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                    />
                </div>
                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="block my-1 text-sm text-gray-500 font-mediumtext-gray-500 dark:text-gray-300"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        autoComplete="off"
                        autoCorrect="off"
                        name="confirmPassword"
                        className="w-full px-3 py-1  text-slate-900 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
                    />
                </div>
                <button
                    type="submit"
                    className=" self-start my-3 w-11/12 p-2 text-white bg-sky-700 rounded-md hover:bg-sky-800  focus:bg-sky-700 focus:outline-none"
                >
                    {currentUser.loading ? (
                        <FontAwesomeIcon
                            className=" animate-spin"
                            icon={faSpinner}
                        />
                    ) : (
                        'Change your password'
                    )}
                </button>
            </form>
            <button
                onClick={() => setCurrentInterface('update_profil')}
                className=" self-start my-3 w-11/12 p-2 text-sky-700 bg-white rounded-md border border-sky-700 focus:outline-none"
            >
                Edit your profil
            </button>
        </div>
    );
}
