import Image from "next/image";
const AboutPage = () => {
  return (
    <section className="container m-auto">
      <h1 className="text-2xl font-bold text-gray-800 p-5">
        About This App
      </h1>
      <p className="px-5 text-gray-600 text-xl ">
        The best web hosting solution for your online sucess
      </p>
      {/* <div>
        <Image
          src="/cloud-hosting.png"
          alt="Cloud Hosting Image"
          width={500}
          height={500}
          //pre loading for the image then the content like about page content 
          priority
        />
      </div> */}
    </section>
  );
};

export default AboutPage;
