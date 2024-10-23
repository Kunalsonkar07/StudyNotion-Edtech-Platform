import { toast } from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { endpoints } from "../apis";
import { useDispatch, useSelector } from "react-redux";
import { UseSelector } from "react-redux";
import { setLoading } from "../../slices/authSlice"


const { RESETPASSTOKEN_API
     , RESETPASSWORD_API } = endpoints ;
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