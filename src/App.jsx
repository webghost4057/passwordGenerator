import { useState , useCallback , useEffect } from 'react'
import './App.css'

function App() {
  const [length , setlength] = useState(8)
  const [numbersAllowed , setNumberAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)
  const [password , setPassword] = useState('')

  const copytext = () =>{
    navigator.clipboard.writeText(password)
    .then(() => alert('Password copied to clipboard'))
    .catch(err => console.error('Could not copy password: ', err));

  }

  const passwordGenerator = useCallback(()=>{
    let char 
    let pass = ''
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numbersAllowed) str += '0123456789'
    if (charAllowed) str +="!@#$%^&*()_+/={}[]`"

    for (let i = 1; i <= length; i++) {
      char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [numbersAllowed,charAllowed,length])
 useEffect(()=>{
  passwordGenerator()

 },[length,numbersAllowed,charAllowed])

  return (
    <>
  <div className="container mx-auto py-10">
      <h1 className="text-center text-3xl font-semibold mb-8">Password Generator</h1>
      <div className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-md">
        <div className="mb-6 flex ">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Generated Password"
            value={password}
            readOnly
          />
          <button className='bg-blue-500 text-white px-3 rounded-md' onClick={copytext}>Copy</button>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <label htmlFor="length" className="block text-sm font-medium">Length:</label>
            <input
              id="length"
              type="range"
              min={8}
              max={30}
              value={length}
              onChange={(e) => setlength(e.target.value)}
              className="w-full mt-1 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span>{length}</span>
          </div>
          <div className="flex items-center">
            <input
              id="numbers"
              type="checkbox"
              checked={numbersAllowed}
              onChange={() => setNumberAllowed(!numbersAllowed)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="numbers" className="ml-2 block text-sm font-medium text-gray-700">Numbers</label>
          </div>
          <div className="flex items-center">
            <input
              id="characters"
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed(!charAllowed)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="characters" className="ml-2 block text-sm font-medium text-gray-700">Special Characters</label>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
