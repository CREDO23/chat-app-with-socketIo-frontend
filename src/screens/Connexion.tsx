import { useState } from 'react';
import SinginForm from '../components/SinginForm';
import SingupForm from '../components/SingupForm';
import logo from '../assets/logo.png';

type Form = 'singin' | 'singup';

export default function (): JSX.Element {
    const [form, setForm] = useState<Form>('singin');

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="hidden h-full bg-bgLogin bg-no-repeat bg-cover w-2/5 md:flex items-center justify-end">
                <div className="md:h-full md:w-4/5 md:flex md:flex-col md:items-center">
                    <div className=" border-red-50 flex flex-col justify-end ml-5 h-2/3">
                        <h2 className=" my-10 text-white text-4xl">
                            <span className=" font-extralight">
                                Welcome to{' '}
                            </span>
                            <span className="bg-clip-text  text-transparent bg-gradient-to-r from-[rgba(12,74,130,1)] to-[rgba(253,216,45,1)] font-bold">
                                Chataw
                            </span>
                        </h2>
                        <div className="flex items-start  flex-col">
                            <p className=" w-4/5 font-light text-white">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Sequi dolorum labore nemo,
                                officia, odit sapiente aliquam reiciendis fugiat
                            </p>
                            <button className=" transition my-3 w-2/5  py-2 text-[rgba(253,216,45,1)] bg-sky-900 rounded-md hover:bg-white  hover:text-sky-900 focus:bg-sky-700 focus:outline-none">
                                Find out more
                            </button>
                        </div>
                    </div>
                    <div className="h-1/3 flex items-center flex-col py-3 justify-end">
                        <a
                            className="text-white text-xs font-extralight"
                            href="http://copyright.be"
                            target="_blank"
                        >
                            Copyright © 2022 Chataw - All rigths reserved
                        </a>
                    </div>
                </div>
                <div className="h-full w-1/5 flex flex-col items-center justify-center">
                    <div
                        className={`h-14 flex items-center cursor-pointer justify-center text-center w-full ${
                            form == 'singin'
                                ? 'bg-white text-sky-900'
                                : 'text-white'
                        } relative py-3 my-1 rounded-l-full`}
                        onClick={() => setForm('singin')}
                    >
                        <span>SINGIN</span>
                        {form == 'singin' ? (
                            <>
                                <div className=" bg-transparent h-14 w-14 absolute top-[-3.5rem] rounded-br-[50%] right-[-0px] shadow-[1.75rem_0rem_white]"></div>
                                <div className=" bg-transparent h-14 w-14 absolute bottom-[-3.5rem] rounded-tr-[50%] right-[-0px] shadow-[1.75rem_0rem_white]"></div>
                            </>
                        ) : null}
                    </div>
                    <div
                        className={`h-14 flex items-center justify-center cursor-pointer text-center w-full ${
                            form == 'singup'
                                ? 'bg-white text-sky-900'
                                : ' text-white'
                        } relative py-3 my-2 rounded-l-full`}
                        onClick={() => setForm('singup')}
                    >
                        <span>SINGUP</span>
                        {form == 'singup' ? (
                            <>
                                <div className=" bg-transparent h-14 w-14 absolute top-[-3.5rem] rounded-br-[50%] right-[-0px] shadow-[1.75rem_0rem_white]"></div>
                                <div className=" bg-transparent h-14 w-14 absolute bottom-[-3.5rem] rounded-tr-[50%] right-[-0px] shadow-[1.75rem_0rem_white]"></div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
            <div className="h-full w-full md:w-3/5 flex items-center justify-center bg-white">
                {form == 'singin' ? (
                    <div className="flex items-center justify-center flex-col w-8/10 md:w-1/2">
                        <img
                            className=" h-[100px] w-[100px] md:w-[160px] md:h-[160px] "
                            src={logo}
                            alt=""
                        />

                        <SinginForm setForm={setForm} />
                    </div>
                ) : form == 'singup' ? (
                    <div className="flex items-center justify-center flex-col w-8/10 md:w-1/2">
                        <img
                            className=" h-[100px] w-[100px] md:w-[160px] md:h-[160px]"
                            src={logo}
                            alt=""
                        />
                        <SingupForm setForm={setForm} />
                    </div>
                ) : null}
            </div>
        </div>
    );
}
