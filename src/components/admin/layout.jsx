import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from './header'

function AdminLayout() {
  const [openSideBar, setOPenSideBar] = useState(false)
  return (
    <div className='flex min-h-screen w-full'>
        <div className='flex flex-1 flex-col' >
            {/* admin header */}
            <AdminHeader setOpen={setOPenSideBar} />
            <main className='flex-1 flex-col flex bg-muted/40 p-4 md:p-6' >
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default AdminLayout