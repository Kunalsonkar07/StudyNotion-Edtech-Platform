
import React from 'react'
import Sidebar from '../components/common/Sidebar'
import { Outlet } from 'react-router-dom'



const Dashboard = () => {

    

  return (
    <div className='flex md:flex-row flex-col md:h-auto h-fit text-richblack-25 w-full'>
        
        
        <Sidebar ></Sidebar>
        <Outlet></Outlet>
    </div>
  )
}

export default Dashboard