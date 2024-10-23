import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getpasswordResetToken } from '../services/operations/authAPI';

const ForgetPassword = () => {
    
    const [ emailSent , setEmailSet] = useState(false) ;
    const [email , setemail ] = useState("") ;
    const { loading } = useSelector( (state) => state.auth ) ;
    const dispatch = useDispatch() ;

    const submitHandler = (e) => {
        e.preventDefault() ;
        dispatch( getpasswordResetToken( email , setEmailSet )  ) ;

    }

    return (
    <div className='text-richblack-25 min-h-screen flex justify-center items-center'>{
        
        loading ? (<div>Loading ...</div>) : 
        
        ( 
            <div>
                <h1>
                    {
                        !emailSent ? "Reset your Password" : "Check your Mail" 
                    }
                </h1>

                <p>
                Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery
                </p>

                <form onSubmit={submitHandler}>
                    {
                        !emailSent && (
                            <label>
                                <p>Email Address</p>
                                <input
                                    className='text-richblack-700'
                                    required
                                    type='email'
                                    name='email'
                                    value={email}
                                    // onChange={ () => setEmailSet(email) } 
                                    onChange={ (e) => setemail(e.target.value)}
                                    placeholder='Enter your email address'
                                ></input>
                            </label>
                        )

                        
                    }
                    <button type='submit'>
                        {
                            !emailSent ?  "Reset Password" : "Resend email" 

                        }
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

export default ForgetPassword