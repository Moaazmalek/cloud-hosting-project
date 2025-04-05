import React from 'react'
import RegisterForm from './RegisterForm'

const RegisterPage = () => {
  return (
    <section className="container m-auto px-7 flex items-center justify-center h-full w-full  ">
    <div className="m-auto bg-white  shadow-lg rounded-xl p-5 min-h-[55%] w-[80%] md:w-[70%] lg:w-1/2">
      <h1 className="text-3xl font-bold text-gray-800 mb-5 text-center ">
        Create New Account
      </h1>
      <RegisterForm />
    </div>
  </section>
  )
}

export default RegisterPage