import { useState, useCallback, useEffect, useRef} from 'react'


function App() {
  const [length, setlength] = useState(8);
  const [numallowed, setnumallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState("");

  const passwordRef = useRef(null);

  const passwordgenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numallowed) str += "0123456789"
    if(charallowed) str += "!@#$%^&*()_+"

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random()*str.length);
      pass += str.charAt(char)
    }
    setpassword(pass)
  }, [length,numallowed,charallowed,setpassword]);

  useEffect(()=>{
    passwordgenerator()
  },[length,numallowed,charallowed,passwordgenerator]
)

const copypassword = useCallback(()=>{
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(password);
},[password])

  return (
    <>
      <h1 className='text-3xl font-bold underline text-center text-white'>PASSWORD GENERATOR</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 mt-10'>
        <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' ref={passwordRef}/>
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copypassword}>copy</button>
      </div>

      <div className='flex text-sm gap-x-2' >

        <div className='flex items-center gap-x-1 text-white'>
          <input type="range" min={6} max={100} value={length}
          className='cursor-pointer'
          onChange={(e)=> setlength(e.target.value)}/>
          <label>length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1 text-white'>
          <input type="checkbox" defaultChecked={numallowed} onChange={()=>setnumallowed(prev => !prev)} />
          <label>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1 text-white'>
          <input type="checkbox" defaultChecked={charallowed} onChange={()=>setcharallowed(prev => !prev)} />
          <label>Characters</label>
        </div>
      </div>
    </>
  )
}

export default App
