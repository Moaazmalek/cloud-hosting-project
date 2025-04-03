import ArticleItem from "@/components/articles/ArticleItem";
import { Article } from "@/utils/types";
import Link from "next/link";
import React from "react";

const ArticlePage = async () => {
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
  <div className="flex justify-center flex-wrap gap-7 ">
  {articles.map((item) => (
        <ArticleItem article={item} key={item.id}/>
      ))}
  </div>
    </section>
  );
};

export default ArticlePage;
