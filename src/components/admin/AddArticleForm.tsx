"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateArticleFormSchema } from "@/utils/types";
import { toast } from "react-toastify";
type ArticleFormType = z.infer<typeof CreateArticleFormSchema>;
const AddArticleForm = () => {
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm<ArticleFormType>({
    mode: "onSubmit",
    resolver: zodResolver(CreateArticleFormSchema),
    defaultValues: { title: "", description: "" },
  });
  const onLoginSubmit: SubmitHandler<ArticleFormType> = async (data) => {
    // toast("Logged in Successfully 😊", {
    //   className: "bg-primary-normal text-white rounded-lg shadow-md ",
    // });
  };
  return (
    <form
      className="flex flex-col space-y-4   h-full w-full mx-auto    "
      onSubmit={handleSubmit(onLoginSubmit)}
    >
      <div className="mb-4 text-base flex flex-col gap-1 rounded-lg b">
        <label className="   w-full h-full    ">
          <input
            {...register("title")}
            className=" w-full p-2 flex-1 rounded-md  border-none outline-none "
            type="text"
            placeholder="Title"
          />
        </label>
        {errors.title?.message && (
          <span className="text-red-400 text-sm pl-2">
            * {errors.title.message}
          </span>
        )}
      </div>
      <div className="mb-4 text-base flex flex-col gap-1">
        <label className="  w-full h-full">
          <textarea
            {...register("description")}
            className="w-full p-2  rounded-md border-none outline-none pl-2 resize-none"
            rows={5}
            placeholder="Enter Article Description"
          ></textarea>
        </label>
        {errors.description?.message && (
          <span className=" -mb-2 text-red-400 text-sm pl-2">
            * {errors.description.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="text-xl text-primary-text bg-primary-background hover:bg-primary-dark  rounded-lg font-bold self-center px-5 py-2"
      >
        Add
      </button>
    </form>
  );
};

export default AddArticleForm;
