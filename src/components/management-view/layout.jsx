import { Outlet } from "react-router-dom"
import ManagementHeader from "./header"
function ManagementLayout() {
    return (
      <div className='flex flex-col bg-white overflow-hidden' >
      {/* common Header Components */}
      <ManagementHeader />
      <main className='flex flex-col w-full' >
      <Outlet />
      </main>
      </div>
    )
  }
  
  export default ManagementLayout