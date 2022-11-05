import { useState } from 'react';
import SinginForm from '../components/SinginForm';
import SingupForm from '../components/SingupForm';

type Form = 'singin' | 'singup';

export default function (): JSX.Element {
    const [form, setForm] = useState<Form>('singin');

    return (
        <>
            {form == 'singin' ? (
                <div className="flex  items-center justify-center flex-col w-2/5">
                    <h1 className=" my-3 text-2xl text-slate-900 font-semibold">
                        Sing In
                    </h1>
                    <SinginForm setForm={setForm} />
                </div>
            ) : form == 'singup' ? (
                <div className="flex  items-center justify-center flex-col w-2/5">
                    <h1 className=" my-3 text-2xl text-slate-900 font-semibold">
                        Sing Up
                    </h1>
                    <SingupForm setForm={setForm} />
                </div>
            ) : null}
        </>
    );
}
