"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/utils/types";
import { toast } from "react-toastify";
type RegisterType = z.infer<typeof RegisterSchema>;
const RegisterForm = () => {
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm<RegisterType>({
    mode: "onSubmit",
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "" },
  });
  const onLoginSubmit: SubmitHandler<RegisterType> = async (data) => {
    toast("Logged in Successfully 😊", {
      className: "bg-primary-normal text-white rounded-lg shadow-md ",
    });
  };
  return (
    <form
      className="flex flex-col space-y-4   h-full  "
      onSubmit={handleSubmit(onLoginSubmit)}
    >
      <div className="mb-4 text-base flex flex-col gap-1">
        <label className=" border p-2 w-full h-full ">
          <input
            {...register("email")}
            className="w-full border-none outline-none pl-2"
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
        <label className="border p-2 w-full h-full">
          <input
            {...register("username")}
            className="w-full border-none outline-none pl-2"
            type="text"
            placeholder="Username"
          />
        </label>
        {errors.username?.message && (
          <span className=" -mb-2 text-red-400 text-sm pl-2">
            * {errors.username.message}
          </span>
        )}
        
      </div>
      <div className="mb-4 text-base flex flex-col gap-1">
          <label className="border p-2 w-full h-full">
            <input
              {...register("password")}
              className="w-full border-none outline-none pl-2"
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
      <div className="mb-4 text-base flex flex-col gap-1">
        <label className="border p-2 w-full h-full">
          <input
            {...register("confirmPassword")}
            className="w-full border-none outline-none pl-2"
            type="password"
            placeholder="Confirm password"
          />
        </label>
        {errors.confirmPassword?.message && (
          <span className=" -mb-2 text-red-400 text-sm pl-2">
            * {errors.confirmPassword.message}
          </span>
        )}
      </div>
      
      <button
        type="submit"
        className="text-xl text-white bg-primary-normal  rounded-lg font-bold self-center px-5 py-2"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
