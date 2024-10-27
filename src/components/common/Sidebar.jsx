import React, { useState } from 'react'
import { sidebarLinks } from '../../data/dashboard-links'
import { Link, useLocation } from 'react-router-dom'
import { ACCOUNT_TYPE } from '../../utils/constant'
import { VscAccount , VscDashboard , VscVm , VscAdd , VscMortarBoard , VscHistory} from "react-icons/vsc";
import { IoMdSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { FaBars } from "react-icons/fa";
// import { useBreakpoint } from "@/hooks/useBreakpoint";


const Sidebar = () => {
    const [ midview , setmidview ] = useState(true);
    ;

    const user = JSON.parse(localStorage.getItem("user")) ;
                // localStorage.setItem("user", JSON.stringify(response?.user))
    const location = useLocation() ;
    // console.log(location.pathname);

    // if ( isAboveMd ){
    //     setmidview(true) ;
    // }
    console.log()
  return (

    <div className='flex flex-col gap-1 '>
        <div  onClick={ () => setmidview(!midview) }
        className='md:w-full bg-richblack-600 text-richblack-25 h-fit md:hidden visible pl-3 p-2'>
            <FaBars ></FaBars>
        </div>
        <div className={`relative md:min-h-screen h-fit md:visible ${ midview ? "md:visible visible" : "md:visible hidden" }  
            md:min-w-[18%] w-full flex flex-col bg-richblack-600 bg-no-repeat text-white gap-2 
             font-bold md:text-md object-cover`}>
    
            <div className='p-3'>
    
                {
                    sidebarLinks.map ( (bar) => {
                        return(
                            ( user.accountType == bar.type || bar.type == null )  && <Link to={bar.path} key={bar.id}
                            // onClick={ () => setmidview(!midview) } >
                            >
                                <div className={`flex items-center gap-3 p-2 border-l-4 border-2 border-brown-900 
                                        ${ location.pathname == bar.path ? " bg-yellow-5 text-black " : " border-transparent" }`}>
                                    {
                                        bar.id == 1 && <VscAccount></VscAccount>
                                    }{
                                        bar.id == 2 && <VscDashboard></VscDashboard>
                                    }{
                                        bar.id == 3 && <VscVm></VscVm>
                                    }{
                                        bar.id == 4 && <VscAdd></VscAdd>
                                    }{
                                        bar.id == 5 && <VscMortarBoard></VscMortarBoard>
                                    }{
                                        bar.id == 6 && <VscHistory></VscHistory>
                                    }
                                    {bar.name}
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
    
            <div className=' w-full h-2 bg-richblack-100'></div>
    
            <div className='p-3 flex flex-col gap-1 '>
                <Link to={"/dashboard/setting"} className={`flex items-center gap-3 p-2 border-l-4 border-2
                     border-brown-900 
                ${ location.pathname == "/dashboard/setting" ? " bg-yellow-5 text-black " : " border-transparent" }`}>
                    
                    <IoMdSettings></IoMdSettings> Setting
                </Link>
    
                <div className={`flex items-center gap-3 p-2 border-l-4 border-2 border-richblack-600     `}>
                    <IoIosLogOut></IoIosLogOut> Logout
                </div>
            </div>
    
        </div>
    </div>
      )
}

export default Sidebar