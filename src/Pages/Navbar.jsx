import React, { useState } from 'react'
import Logo from '../assets/Logo/Logo-Full-Light.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BsCartDash } from "react-icons/bs";
// import { profileSection } from './profileSection';
import { apiconnector } from '../services/apiconnector'
import {categories}  from '../services/apis'
import { useEffect } from 'react';
import { IoIosArrowDropdown  } from "react-icons/io";
// import profilen from './ProfileSection';

const Navbar = () => {

    const { token } = useSelector( (state) => state.auth ) ;
    const { user } = useSelector( (state) => state.profile ) ;
    const { totalItems } = useSelector( (state) => state.cart ) ;

    const [ selected , useselect ] = useState('Home') ;

    const changeelect = (textbook) => {
        useselect(textbook) ;
    }

    const [ selectLinks , setselectLinks ] = useState([]) ;
    const [ showbar , setshowbar ] = useState(true)
    const fetchSelectLinks = async () => {
        try {
            const result = await apiconnector("GET", categories.CATEGORIES_API);
            
            // console.log(typeof(result.data));
            // console.log(result.data[0].name);
            setselectLinks(result.data) ;
            // console.log(selectLinks)
            // console.log(selectLinks[0].name);
        } catch (error) {
            console.log("There is a problem fetching the link");
            console.log(error);
        }
    };
    
    const [ data , setdata ] = useState(null) ;
    useEffect( () => {
        fetchSelectLinks() ;
            // console.log(user.accountType)
            if ( user ){

                setdata(JSON.parse(user) ) ;
                console.log(data?.image) 
            }
    },[])

  return (
    <div className='text-white max-w-[100%] md:h-[100px] h-[70px] bg-richblack-800 flex justify-around gap-5 items-center p-3'>
        <div>
            <Link to={"/"}> 
                <img src={Logo} alt="" className='' />
            </Link>
        </div>
        <div className='gap-10 text-xl relative md:flex hidden'>
            <Link to="/" className={`${ selected === 'Home' ? "text-yellow-100" : "text-white"} p-2`} 
                        onClick={() => changeelect('Home')}>
                Home
            </Link>

            <div>
                <div className='flex gap-2 items-center group relative'>
                    <div className={`${ selected === 'catalog' ? "text-yellow-100" : "text-white" } p-2`} >
                        Catalog
                    </div>
                    <IoIosArrowDropdown />
                        <div className='w-[300%]  absolute top-[90%] right-[-80%] text-richblack-25 z-10 invisible 
                                    group-hover:visible  text-xl '>
                            {/* <div className=' w-[10%] rotate-45 bg-white h-[10px] '></div> */}
                            <div className=' bg-richblack-700  p-2 rounded-lg  border-blue-900
                             flex flex-col gap-2  '>
                                {
                                    selectLinks.map ( (link,index) => (
                                        // <Link key={index} to={`catalog/${link.name}`}>
                                        //     {link.name}
                                        // </Link>
    
                                            <Link key={index} to={`catalog/${link.name}`} onClick={ () => changeelect(`catalog`)}
                                                className={`p-2 bg-richblack-600 rounded-lg  `}>
                                               {link.name} 
                                            </Link>
                                       
                                    ))
                                }
                            </div>
                        </div>
                    
                </div>

            </div>


            <Link to="/about"  className={`${ selected === 'about' ? "text-yellow-100" : "text-white"} p-2`}
                         onClick={() => changeelect('about')}>
                About
            </Link>
            <Link to="/contact"  className={`${ selected === 'contact' ? "text-yellow-100" : "text-white"} p-2`} 
                            onClick={() => changeelect('contact')}>
                ContactUs
            </Link>
        </div>
        <div className='relative  flex items-center gap-5 h-full'>
            {
                 user && user.accountType !== "Instructor" && (
                    <Link to={'/dashboard/cart'} className='relative' >
                        <BsCartDash className='md:text-2xl text-xl'></BsCartDash>
                        {
                            totalItems > 0 && (
                                <span>{totalItems}</span>
                            )
                        }

                    </Link>
                 )
            }


            {
                token === null && (
                    <Link to={"/login"}>
                        <button className='p-2 rounded-md bg-richblack-600'>Login</button>
                    </Link>
                )
            }

            {
                token === null && (
                    <Link to={"/signup"}>
                        <button className='p-2 rounded-md bg-richblack-600'>SignUp</button>
                    </Link>
                )
            }
            
            {
                token !== null &&  (
                    <div className='relative '>
                        <div onClick={ () => setshowbar(!showbar)} >
                            <img src={data?.image} alt="img" 
                                className='  md:h-[50px] h-[25px] rounded-full aspect-square cursor-pointer object-cover'
                                />
                        </div>
                        <div className={`flex flex-col gap-2 font-bold absolute top-full z-10 cursor-pointer right-0 p-2 m-2 border-2 border-richblack-600 bg-richblack-800
                         text-richblack-25 ${ showbar ? "" : "hidden"}`}>
                            <Link to={'/dashboard/my-profile'}
                                onClick={ () => setshowbar(!showbar)}
                            >Dashboard</Link>
                            <Link>Logout</Link>
                        </div>
                    </div>
                )
            }

        </div>
    </div>
  )
}

export default Navbar

