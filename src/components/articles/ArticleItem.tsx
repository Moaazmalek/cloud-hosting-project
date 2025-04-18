import React from "react";
import Link from "next/link";
import { Article } from "@/utils/types";
type ArticleItemProps = {
  article: Article;
};
const ArticleItem = ({ article }: ArticleItemProps) => {
  const { id, title, description } = article;
  return (
    <div
      key={id}
      className="p-5
  flex flex-col justify-between
     rounded-lg
     my-1
     shadow-lg
     border-2
     border-gray-400
     hover:bg-slate-200
     w-full
     md:w-2/5
     lg:w-1/4
       "
    >
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="my-2 text-xl text-primary-text p-1 line-clamp-1">{description}</p>
      <Link
        className="text-xl bg-primary-accent w-full block text-center p-1 text-white rounded-lg "
        href={`/articles/${id}`}
      >
        Read More
      </Link>
    </div>
  );
};

export default ArticleItem;
