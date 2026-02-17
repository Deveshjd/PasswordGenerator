import { useState, useCallback } from 'react'

import './App.css'

function App() {
  const [length, setlenght] = useState(8);
  const [numallowed, setnumallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState("");

  const passwordgenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numallowed) str += "0123456789"
    if(charallowed) str += "!@#$%^&*()_+"

    for (let i = 1; i <= str.length; i++) {
      const char = Math.floor(Math.random()*str.length);
      pass += str.charAt(char)
    }
    setpassword(pass)
  }, [length,numallowed,charallowed,setpassword]);

  return (
    <>
      <h1 className='text-3xl font-bold underline text-center text-white'>PASSWORD GENERATOR</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 mt-10'>
        <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password'/>
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
    </>
  )
}

export default App
