import Link from "next/link"

const NotFoundPage = () => {
  return (
   <section className="  flex justify-center items-center flex-col w-full h-full ">
    <h1 className="text-gray-800 text-6xl font-bold ">404</h1>
    <p className="text-gray-500 text-3xl mt-2 mb-5">Page Not Found</p>
    <Link
    href="/"
    className="text-xl underline text-primary-normal">Go to home page</Link>
   </section>
  )
}

export default NotFoundPage