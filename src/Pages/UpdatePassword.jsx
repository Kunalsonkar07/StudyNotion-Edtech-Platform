import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { IoMdEyeOff , IoMdEye } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';
// import { resetPassword } from '../../server/controllers/ResetPassword';


const UpdatePassword = () => {

    const dispatch = useDispatch() ;
    const location = useLocation() ;
    const [ showpassword , setshowpassword ] = useState(false) ;
    const [ showConfirmpassword , setshowConfirmpassword ] = useState(false) ;
    const { loading } = useSelector( (state) => state.auth) ;

    const [formdata, setformdata] = useState({ password: "", confirmPassword: "" });

    const handleOnchange = (e) =>{
        setformdata((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }

    const { password , confirmPassword } = formdata ;
    

    const Handleonsubmit = (e) => {
        e.preventDefault() ;

        const token = location.pathname.split("/").at(-1) ;
        dispatch( resetPassword( password , confirmPassword , token ) ) ;

    }


  return (
    <div className='min-h-screen flex text-white justify-center items-center '>
        {
            loading ? 
            (
                <div>Loading....</div>
            )
            :
            (
                <div >
                    <h1>Choose New Password</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, non?</p>

                    <form onSubmit={ Handleonsubmit }> 
                            <label>
                                <p>New Password <sup>*</sup></p>
                                <input 
                                    required
                                    autoComplete='on'
                                    type={ showpassword ? "text" : "password" }
                                    value={password}
                                    name='password'
                                    onChange={handleOnchange}
                                    placeholder='Enter new passowrd'
                                    className=' text-black'
                                    />
                                <span onClick={ () => { setshowpassword ( ( prev) => !prev )}}>
                                    {
                                        showpassword ? <IoMdEye /> :<IoMdEyeOff /> 
                                    }
                                </span>
                            </label>

                            <label>
                                <p>Confirm Password <sup>*</sup></p>
                                <input 
                                    required
                                    autoComplete='on'
                                    type={ showConfirmpassword ? "text" : "password" }
                                    value={ confirmPassword }
                                    name='confirmPassword'
                                    onChange={ handleOnchange }
                                    placeholder='Enter confirm passowrd'
                                    className=' text-black'
                                />
                                <span onClick={ () => { setshowConfirmpassword ( ( prev) => !prev )}}>
                                    {
                                        showConfirmpassword ? <IoMdEye /> :<IoMdEyeOff /> 
                                    }
                                </span>
                            </label>

                            <button type='submit' > 
                                Reset Password 
                            </button>
                    </form>

                    <div>
                        <Link to="/login">
                                <p>Back to login</p>
                        </Link>
                    </div>
                </div>   
            )
        }
    </div>
  )
}

export default UpdatePassword