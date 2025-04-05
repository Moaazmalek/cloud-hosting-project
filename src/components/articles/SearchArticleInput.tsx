'use client'
import { useState } from "react";
const SearchArticleInput = () => {
    const [searchText, setSearchText] = useState<string>('')
   const formSubmitHandler=async(e:React.FormEvent)  => {

   }
  return (
    <form
    className="flex flex-col w-full md:w-[80%]"
    onSubmit={formSubmitHandler}
  >
    <label
    className="w-full   text-lg   text-gray-900"
     htmlFor="searchInput">
        <input
        className="w-full h-full p-3 rounded-lg border-2 border-gray-300 focus:border-gray-700 outline-none  "
         value={searchText} 
        id="searchInput" 
        type="search"
        placeholder="Search for articles"
        onChange={(e) => setSearchText(e.target.value)}/>
    </label>
   
    {/* <button
      type="submit"
      className="text-xl text-white bg-primary-normal  rounded-lg font-bold self-center px-5 py-2"
    >
      Login
    </button> */}
  </form>
  )
}

export default SearchArticleInput