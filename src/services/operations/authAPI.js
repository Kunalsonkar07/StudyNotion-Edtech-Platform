import { toast } from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { endpoints } from "../apis";
import { useDispatch, useSelector } from "react-redux";
import { UseSelector } from "react-redux";
import { setLoading , setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice";
import e from "cors";

const { RESETPASSTOKEN_API
     , RESETPASSWORD_API } = endpoints ;
const { LOGIN_API } = endpoints ;
// console.log(RESETPASSTOKEN_API) ;



export  function getpasswordResetToken( email , setEmailSet ){


    return async(dispatch) => {
        dispatch(setLoading(true)) ;
        try {
            // console.log("hello") ;
            // console.log(RESETPASSTOKEN_API) ;
            const responce = await apiconnector("POST" , RESETPASSTOKEN_API , { email } ) ;
            console.log("reset password - >" , responce ) ;

            // if ( !responce.success ){
            //     throw new Error(responce.data.message) ;
            // }
            
            toast.success("Reset Email Sent") ;
            setEmailSet(true) ;
        } catch (error) {

            console.log("RESTPASSORD TOKEN ERROR")
        }
        dispatch(setLoading(false ) ) ;
    }
}

export function resetPassword ( password , confirmPassword , token ){
    return async(dispatch) => {
        dispatch(setLoading(true)) ;
        try {
            // console.log("hello") ;
            // console.log(RESETPASSTOKEN_API) ;
            // console.log(password);
            // console.log(confirmPassword);
            // console.log(token);

            const responce = await apiconnector("POST" , RESETPASSWORD_API , 
                        { password , confirmPassword , token } ) ;
            console.log("reset password - >" , responce ) ;

            // if ( !responce.Error ){

            //     throw new Error(responce.message) ;
            // }
            
            toast.success("Password Reset") ;
            
        } catch (error) {
            
            toast.error("Password enable to reset") ;
            console.log("RESeTPASSORD ERROR")
        }
        dispatch(setLoading(false ) ) ;
    }
}

export function loginuser( email , password , navigate ){
    return async(dispatch) =>{
        dispatch(setLoading(true)) ;
        try {
            const response = await apiconnector('POST' , LOGIN_API , 
                { email , password })
            
                console.log(response) ;
                console.log(response?.token) ;
                // dispatch(setToken(response?.token))
                // console.log("hello");

                const userImage = response?.user?.image
                ? response?.user?.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data?.user.firstName}`


                // console.log(userImage)
                // console.log("hello");
                dispatch(setUser({ ...response.data?.user, image: userImage }))
                
                
                localStorage.setItem("token", JSON.stringify(response.data?.token))
                localStorage.setItem("user", JSON.stringify(response.data?.user))
                toast.success("Login Successfull") ;
                navigate("/dashboard") ;
        } catch (error) {
            toast.error("LOGIN UNSUCCESSFULL") ;
            console.log("Error while login", error)
        }
        dispatch(setLoading(false)) ;
    }
}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
}