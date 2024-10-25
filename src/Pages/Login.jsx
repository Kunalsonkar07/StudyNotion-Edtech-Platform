import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/Auth/Template"
import { UseSelector, useSelector } from "react-redux"
const Login = () => {
  
  const { loading } = useSelector( (state) => state.auth ) ;

  return (

    loading ? (
      <div>loading.....</div>
    ) : 
    ( 
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
    )
  )
}

export default Login