import LoginForm from "./LoginForm";
const LoginPage = () => {
  return (
    <section className="container m-auto px-7 flex items-center justify-center h-full w-full  ">
      <div className="m-auto bg-white  shadow-lg rounded-xl p-5 min-h-[55%] w-[80%] md:w-[70%] lg:w-1/2">
        <h1 className="text-3xl font-bold text-gray-800 mb-5 text-center ">
          Login
        </h1>
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
