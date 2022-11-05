import { useState } from "react"
import USER from "../types/user"



export default function (): JSX.Element {
    
    const [signinForm, setSinginForm] = useState({
        userName: '',
        password : '',
    })

    return (
        <form>
            <div className=" flex flex-col items-start my-4">
                <label className="" htmlFor="userName">
                    User Name
                </label>
                <input
                    type="email"
                    id="userName"
                    placeholder="bakerathierry@gmail.com"
                />
            </div>

            <div className=" flex flex-col items-start my-4">
                <label className="" htmlFor="userName">
                    Passowrd
                </label>
                <input
                    type="password"
                    id="userName"
                    placeholder="***************"
                />
            </div>
        </form>
    )
}