import React from 'react'
interface SearchArticlePageProps  {
  params:{}
  searchParams:{
    searchText:string
  }

}
const SearchArticlePage = ({params,searchParams}:SearchArticlePageProps) => {
  
  return (
   <section className="h-full px-5 container m-auto ">
    {searchParams.searchText}
   </section>
  )
}

export default SearchArticlePage