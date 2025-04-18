import AddArticleForm from "@/components/admin/AddArticleForm"

const AdminPage = () => {

  return (
    <div className="h-full flex items-center justify-center px-5 lg:px-20">
      <div className="shadow p-4 bg-primary-accent rounded w-[80%] md:w-[60%] flex flex-col items-center">
        <h2 className="text-lg text-primary-card font-semibold mb-4 ">Add New Article</h2>
        <AddArticleForm/>
      </div>

    </div>
  )
}

export default AdminPage