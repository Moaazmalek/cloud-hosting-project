"use client";

import Link from "next/link";

interface PaginationProps {
  pages: number;
  pageNumber: number;
  route: string;
}
const Pagination = ({ pages, pageNumber, route }: PaginationProps) => {
  let pagesArray: number[] = [];
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }
  return (
    <div className="flex items-center justify-center mt-2 mb-10 ">
      {pageNumber > 1 && (
        <Link
          href={`${route}?pageNumber=${pageNumber - 1}`}
          className="bg-primary-accent
         text-white
         mx-3 
        rounded-md
         hover:bg-primary-dark 
         py-1 
        px-3 
        text-xl 
        cursor-pointer 
        transition "
        >
          Prev
        </Link>
      )}
      {pagesArray.map((page) => (
        <Link
          href={`/articles?pageNumber=${page}`}
          className={`border border-gray-700 py-1 px-3 text-xl cursor-pointer hover:bg-gray-200 ${
            page === pageNumber ? "bg-gray-300 " : ""
          } transition `}
          key={page}
        >
          {page}
        </Link>
      ))}
      {pageNumber !== pages && (
        <Link
          href={`${route}?pageNumber=${pageNumber + 1}`}
          className="bg-primary-accent
        text-white
        mx-3 
       rounded-md
        hover:bg-primary-dark 
        py-1
        px-3
        text-xl 
       cursor-pointer 
       transition "
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
