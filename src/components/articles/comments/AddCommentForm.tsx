'use client'
import { useState } from "react";
import {toast} from 'react-toastify'
const AddCommentForm = () => {
    const [text, setText] = useState<string>('')
   const formSubmitHandler=async(e:React.FormEvent)  => {
    e.preventDefault();
    if(text==='')return toast.error("Comment can't be empty ")

   }
  return (
    <form
    className=""
    onSubmit={formSubmitHandler}
  >
    <label
    className="w-full   text-base   text-gray-900"
     htmlFor="searchInput">
        <input
        className="w-full h-full p-3 rounded-lg border-2 border-gray-300 focus:border-gray-400 outline-none  "
         value={text} 
        id="searchInput" 
        type="text"
        placeholder="Add a comment....."
        onChange={(e) => setText(e.target.value)}/>
    </label>
   
    <button
      type="submit"
      className=" text-white bg-green-600  mt-2 p-1 w-min  rounded-lg hover:bg-green-800 transition"
    >
      Comment 
    </button>
  </form>
  )
}

export default AddCommentForm