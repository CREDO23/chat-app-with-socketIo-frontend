import { useState } from 'react';

type Form = 'singin' | 'singup';
type Props = {
    setForm: React.Dispatch<React.SetStateAction<Form>>;
};

export default function ({ setForm }: Props): JSX.Element {
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(signinForm);
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
                    type="email"
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
                    onClick={() => setForm('singup')}
                    className=" font-medium ml-2 cursor-pointer text-slate-50"
                >
                    Sing up
                </span>
            </div>

            <div>
                <button
                    type="submit"
                    className=" w-full px-2 py-4 text-white bg-sky-900 rounded-md hover:bg-sky-800  focus:bg-sky-700 focus:outline-none"
                >
                    SING IN
                </button>
            </div>
        </form>
    );
}
