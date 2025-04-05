import ArticleItem from "@/components/articles/ArticleItem";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { Article } from "@/utils/types";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
export const metadata:Metadata = {
  title:"Articles Page",
  description:"Users Articles "
}
const ArticlePage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  let articles: Article[] = [];
  if(!response.ok) {
    throw new Error("Failed to fetch articles")
  }
  if (response.ok) {
    articles = await response.json();
  }

  return (
    <section className="container m-auto px-5  ">
     <div className="flex justify-center items-center my-4">
     <SearchArticleInput/>
     </div>
  <div className="flex justify-center flex-wrap gap-7 ">
  {articles.slice(0,6).map((item) => (
        <ArticleItem article={item} key={item.id}/>
      ))}
  </div>
  <Pagination/>
    </section>
  );
};

export default ArticlePage;
