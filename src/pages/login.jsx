import Template from "../components/Auth/Template";
import loginImg from "../assets/Images/signupimg.jpg"

function Login() {
  return (
    <Template
      title="Welcome Back to FileShare"
      description1="Access, manage, and share your files seamlessly."
      description2="Fast, secure, and organized file sharing for everyone."
      image={loginImg}
      formType="login"
    />
  )
}


export default Login;