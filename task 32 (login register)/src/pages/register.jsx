import React, { useState } from 'react'

function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPassword] = useState("")
    const addUser = (e) => {
        e.preventDefault()
        if (!name.trim() !== "" || !email.trim() !== "" || !pass.trim() !== "") {
           alert("Xanaları boş saxlamaq olmaz")
           return
        }
        fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ name, email, pass })
            })
    }
    return (
        <div className='h-screen flex justify-center items-center flex-col gap-[10px]'>
            <h2 className='text-[purple] text-[45px] font-bold'>Register </h2>
            <form className='w-[500px] border-solid border-[1px] border-purple-900 p-[20px] rounded-[10px] flex flex-col gap-[25px] ' onSubmit={addUser}>

                <input type='text' className='rounded-[10px] bg-[violet] w-full p-[9px] focus:outline-none' placeholder='fullname' onChange={(e) => setName(e.target.value)}></input>

                <input type='email' className='rounded-[10px] bg-[violet] w-full p-[9px] focus:outline-none' placeholder='email' onChange={(e) => setEmail(e.target.value)}></input>

                <input type='password' className=' rounded-[10px] bg-[violet] w-full p-[9px] focus:outline-none' placeholder='password' onChange={(e) => setPassword(e.target.value)}></input>

                <button type='submit' className='border-[1px] border-[violet]  text-[purple] p-[7px] cursor-pointer font-bold rounded-[30px] hover:bg-[violet] hover:text-[white] duration-[0.4s]'>Register</button>


            </form>
        </div>
    )
}

export default Register
