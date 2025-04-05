import AdminSidebar from "@/components/admin/AdminSidebar"
import { Metadata } from "next"

interface AdminDashboardLayoutProps {
    children:React.ReactNode
}
export const metadata:Metadata = {
    title:"Admin Dashboard ",
    description:"This is admin dashboard"
}
const AdminDashboardLayout = ({children}:AdminDashboardLayoutProps) => {
  return (
    <div className="h-full flex items-start justify-between overflow-hidden">
      <div className=" h-full w-16 lg:w-1/5 bg-primary-normal text-white p-1 lg:p-5 ">
        <AdminSidebar/>
      </div>
      <div className="w-full h-full lg:w-4/5 overflow-y-scroll ">
        {children}
      </div>
    </div>
  )
}

export default AdminDashboardLayout