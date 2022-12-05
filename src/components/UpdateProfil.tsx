import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateUser, uploadImage } from '../store/slices/currentUser';
import logo from '../assets/logo.png';
import { useRef, useState } from 'react';

type Props = {
    setCurrentInterface: React.Dispatch<
        React.SetStateAction<'profil' | 'update_password' | 'update_profil'>
    >;
};

export default function ({ setCurrentInterface }: Props): JSX.Element {
    const currentUser = useAppSelector((state) => state.currentUser);

    const profilLink = useRef<HTMLImageElement>(null);

    const [updateForm, setUpdateForm] = useState({
        userName: currentUser.user?.userName as string,
        firstName: currentUser.user?.firstName as string,
        lastName: currentUser.user?.lastName as string,
        email: currentUser.user?.email as string,
        bio: currentUser.user?.bio as string,
        avatar: (currentUser.user?.avatar as string) || '',
    });

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
            console.log(currentUser.user?.avatar, profilLink.current?.src);

            dispatch(
                updateUser({
                    id: currentUser.user?._id,
                    body: {
                        firstName: updateForm.firstName,
                        lastName: updateForm.lastName,
                        email: updateForm.email,
                        bio: updateForm.bio,
                        avatar:
                            currentUser.user?.avatar || profilLink.current?.src,
                    },
                }),
            );

            setTimeout(() => {
                if (!currentUser.loading) {
                    setCurrentInterface('profil');
                }
            }, 2000);
        } catch (error) {
            toast.error(error as string);
        }
    };

    return (
        <div>
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex flex-col items-start"
            >
                <div className="relative self-center flex my-3 items-center justify-center">
                    {currentUser.avatarLoading ? (
                        <div className="h-[10rem] flex items-center justify-center rounded-full border w-[10rem]">
                            <FontAwesomeIcon
                                className=" animate-spin"
                                icon={faSpinner}
                            />
                        </div>
                    ) : (
                        <img
                            ref={profilLink}
                            src={currentUser.user.avatar || logo}
                            className="h-[10rem] object-cover rounded-full border w-[10rem]"
                            alt=""
                        />
                    )}

                    <div className="h-8 flex items-center justify-center  w-8 cursor-pointer bottom-5 right-1 absolute rounded-full border p-2  text-sky-800  bg-sky-100">
                        <input
                            type="file"
                            onChange={(e) =>
                                dispatch(
                                    uploadImage(e.target?.files as FileList),
                                )
                            }
                            className="bg-transparent h-5 w-5"
                        />
                    </div>
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
                        autoComplete="off"
                        autoCorrect="off"
                        name="firstName"
                        value={updateForm.firstName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleUpdateForm(e, 'firstName')
                        }
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
                        autoComplete="off"
                        autoCorrect="off"
                        name="lastName"
                        value={updateForm.lastName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleUpdateForm(e, 'lastName')
                        }
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
                        autoComplete="off"
                        autoCorrect="off"
                        name="email"
                        value={updateForm.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleUpdateForm(e, 'email')
                        }
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
                        autoComplete="off"
                        autoCorrect="off"
                        rows={4}
                        name="bio"
                        value={updateForm.bio}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            handleUpdateForm(e, 'bio')
                        }
                        className="w-full px-3 py-1 text-slate-900 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none  focus:ring-indigo-100 focus:border-indigo-200"
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
                        'Save modifications'
                    )}
                </button>
            </form>
            <button
                onClick={() => setCurrentInterface('update_password')}
                className=" self-start my-3 w-11/12 p-2 text-sky-700 bg-white rounded-md border border-sky-700 focus:outline-none"
            >
                Change your password
            </button>
        </div>
    );
}
