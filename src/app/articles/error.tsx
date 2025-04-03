'use client'
import Link from "next/link"

interface ErrorPageProps {
    error:Error;
    reset:() => void
}
const ArticlesErrorPage = ({error,reset}:ErrorPageProps) => {
  return (
    <div className="pt-7 text-center">
        <p className="mb-2 
        ">This is custom error page for articles page.</p>
      <div className="text-xl text-red-600 font-semibold">
      Something went wrong!!
      </div>
      <h2 className="text-gray-700 my-3 text-xl">
        Error Message:{error.message}
      </h2>
      <button
      onClick={() => reset()} className="bg-primary-normal
       font-bold 
      py-2
       px-4
       text-white
       rounded-full 
       hover:bg-primary-dark
      ">
        Try again
      </button>
<Link href="/"
className="text-xl 
underline 
text-primary-normal
hover:text-primary-dark

block mt-6" >Go to home page.</Link>
    </div>
  )
}

export default ArticlesErrorPage