"use client";

const Pagination = () => {
  const pages = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center justify-center mt-2 mb-10 ">
      <div className="bg-primary-normal
       text-white
       mx-3 
      rounded-md
       hover:bg-primary-dark 
       py-1 
      px-3 
      text-xl 
      cursor-pointer 
      transition ">
        Prev
      </div>
      {pages.map((page) => (
        <div
          className="border border-gray-700 py-1 px-3 text-xl cursor-pointer hover:bg-gray-200 transition "
          key={page}
        >
          {page}
        </div>
      ))}
      <div className="bg-primary-normal
       text-white
       mx-3 
      rounded-md
       hover:bg-primary-dark 
       py-1
       px-3
       text-xl 
      cursor-pointer 
      transition ">
        Next
      </div>
    </div>
  );
};

export default Pagination;
