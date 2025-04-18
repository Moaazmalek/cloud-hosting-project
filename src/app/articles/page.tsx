import ArticleItem from "@/components/articles/ArticleItem";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { getArticles, getArticlesCount } from "@/utils/queries";
import { Article } from "@/utils/types";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
export const metadata: Metadata = {
  title: "Articles Page",
  description: "Users Articles ",
};
interface ArticlePageProps {
  searchParams: {
    pageNumber: string;
  };
}

const ArticlePage = async ({ searchParams }: ArticlePageProps) => {
  const { pageNumber } = searchParams;
  const articles: Article[] = await getArticles(pageNumber);
  const count:number=await getArticlesCount()
const pages=Math.ceil(count / ARTICLE_PER_PAGE)

  return (
    <section className="container m-auto px-5  ">
      <div className="flex justify-center items-center my-4">
        <SearchArticleInput />
      </div>
      <div className="flex justify-center flex-wrap gap-7 ">
        {articles.map((item) => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      <Pagination
      pageNumber={parseInt(pageNumber)}
      route='/articles'
      pages={pages}

     />
    </section>
  );
};

export default ArticlePage;
