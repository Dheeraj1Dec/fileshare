import signupImg from "../assets/Images/signupimage.webp"
import Template from "../components/Auth/Template"

function Signup() {
  return (
    <Template
      title="Share and Manage Your Files Effortlessly with FileShare"
      description1="Upload, access, and organize your files securely from anywhere."
      description2="Experience fast, reliable, and private file sharing built for modern teams."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup