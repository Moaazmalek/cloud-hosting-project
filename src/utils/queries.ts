import { Article } from "./types";
//Get articles based on pageNumber
export async function getArticles(pageNumber: string | undefined): Promise<Article[]> {
    const response = await fetch(
      `http://localhost:3000/api/articles?pageNumber=${pageNumber}`
    );
    let articles: Article[] = [];
  
    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }
  
    return await response.json();
  }
//
export async function getArticlesCount(): Promise<number> {
    const response = await fetch(
      `http://localhost:3000/api/articles/count`
    );
  
    if (!response.ok) {
      throw new Error("Failed to get  articles count");
    }
  
    const {count}= await response.json() as {count:number}
    return count
  }
