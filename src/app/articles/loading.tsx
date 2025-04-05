const articlesSkeleton = [1, 2, 3, 4, 5, 6];

const Loading = () => {
  return (
    <section className="h-full container m-auto px-5 flex flex-col items-center animate-pulse">
      <div className="my-5 w-full md:w-2/3 m-auto bg-gray-300 h-10 "></div>
      <div className="w-full h-full flex gap-7 flex-wrap justify-center items-center  ">
        {articlesSkeleton.map((item) => (
          <div
            key={item}
            className="p-5
  flex flex-col justify-between
     rounded-lg
     my-1
     bg-gray-200 
     w-full
     md:w-2/5
     lg:w-1/4
"
          >
            <h3 className="h-6 bg-gray-300"></h3>
            <p className="my-2  bg-gray-300 p-1 h-10"></p>
            <div className="  w-full block text-center p-1 bg-gray-400  rounded-lg h-8 "></div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-2 mb-10">
        <div className="bg-gray-300 w-48 rounded-sm h-9"></div>
      </div>
    </section>
  );
};

export default Loading;
