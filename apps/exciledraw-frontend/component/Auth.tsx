"use client";

import { Button } from "@repo/ui/button"
interface AuthProps {
    text : string
}
export default function Auth(props : AuthProps){
    function onclick(){
        console.log(props.text)
    }

    return <div>
        <div className="flex justify-center items-center flex-col gap-2 p-10">
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
            </div>
            <div className="flex justify-center items-center flex-col gap-8 p-10">
                <Button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onclick={onclick} >
                    {props.text}
                </Button>
            </div>
        </div>
}