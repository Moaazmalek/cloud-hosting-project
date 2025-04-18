"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/utils/types";
import { toast } from "react-toastify";
import {useRouter} from 'next/navigation'
type LoginType = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  //Juse in client component. 
  const router=useRouter()
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm<LoginType>({
    mode: "onSubmit",
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });
  const onLoginSubmit: SubmitHandler<LoginType> = async (data) => {
    toast("Logged in Successfully 😊", {
      className: "bg-primary-normal text-white rounded-lg shadow-md ",
    });
    router.replace('/')
  };
  return (
    <form
      className="flex flex-col space-y-4   h-full  "
      onSubmit={handleSubmit(onLoginSubmit)}
    >
      <div className="mb-4 text-base flex flex-col gap-1">
        <label className=" border  w-full h-full ">
          <input
            {...register("email")}
            className="w-full border-none outline-none pl-2 p-2"
            type="email"
            placeholder="Email"
          />
        </label>
        {errors.email?.message && (
          <span className="-mb-2 text-red-400 text-sm pl-2">
            * {errors.email.message}
          </span>
        )}
      </div>
      <div className="mb-4 text-base flex flex-col gap-1">
        <label className="border w-full h-full">
          <input
            {...register("password")}
            className="w-full border-none outline-none pl-2 p-2"
            type="password"
            placeholder="Password"
          />
        </label>
        {errors.password?.message && (
          <span className=" -mb-2 text-red-400 text-sm pl-2">
            * {errors.password.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="text-xl text-primary-text bg-primary-card  rounded-lg font-bold self-center px-5 py-2"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
