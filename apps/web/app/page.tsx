"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Home() {
  const inputRef = useRef();
  const router = useRouter();
  function onClickHandler(){
    //@ts-ignore
    const value = inputRef.current?.value;
    router.push(`/room/${value}`)
  }
  return (
    <div style={{
      height: "100vh",
      width :"100vw",
      display:"flex",
      background:"blue",
      justifyContent:"center",
      alignItems:"center"

    }}>
      <div>

      <input style={{padding:10,borderRadius:"8px"}} ref={inputRef} placeholder="Room ID"></input>
      <button style={{padding:10,borderRadius:"8px"}} onClick={onClickHandler}>Join room</button>
      </div>

    </div>
  );
}
