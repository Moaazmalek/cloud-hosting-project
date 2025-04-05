import Link from "next/link";
import { CgMenuGridR } from 'react-icons/cg';
import { MdOutlineArticle } from 'react-icons/md';
import { FaRegComments } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className="flex flex-col items-center  md:items-start">
      <Link href="/admin" className="flex items-center text-base font-semibold">
        <CgMenuGridR className="text-3xl me-1" />
        <span className="hidden lg:block">Dashboard</span>
      </Link>
      <ul className="mt-10 flex items-center justify-center flex-col lg:items-start">
        <Link className="flex items-center text-base mb-5 lg:border-b border-gray-300 hover:border-yellow-200 hover:text-yellow-200 transition" href="/admin/articles-table?pageNumber=1">
          <MdOutlineArticle className="me-1" />
          <span className="hidden lg:block">Articles</span>
        </Link>
        <Link className="flex items-center text-base mb-5 lg:border-b border-gray-300 hover:border-yellow-200 hover:text-yellow-200 transition" href="/admin/comments-table">
          <FaRegComments className="me-1" />
          <span className="hidden lg:block">Comments</span>
        </Link>
      </ul>
    </div>
  )
}

export default AdminSidebar;