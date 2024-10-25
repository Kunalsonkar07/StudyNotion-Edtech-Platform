import { useSelector } from "react-redux"
import signupImg from "../assets/Images/signup.webp"
import Template from "../components/core/Auth/Template"


const Signup = () => {

  const { loading } = useSelector( (state) => state.auth )

  return (

    loading ? ( <div>Loading...</div>) : (

      <Template
        title="Join the millions learning to code with StudyNotion for free"
        description1="Build skills for today, tomorrow, and beyond."
        description2="Education to future-proof your career."
        image={signupImg}
        formType="signup"
      />
    )

  )
}

export default Signup