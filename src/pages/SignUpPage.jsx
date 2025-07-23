import { useRef, useState } from "react";
import "./SignUp.css"

function SignUp(){

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [preview, setPreview] = useState(null)

  const fileInputRef = useRef()

  // Handle Box Click_______________________________________________________________
   const handleBoxClick = () => {
         fileInputRef.current.click();
   }


   

  return (
    <div>

      <h2>Sign Up Page</h2>

      <div>
          <form>
            {/* <input 
                  name="profile_pic"
                  type="file"
                  value={profilePic}
                  onChange={(event) => setProfilePic(event.target.value)}
            /> */}

            <div 
                 className="box_click"
                 
                 
                 >

            </div>

            <input
                  name="firstname"
                  type="text"
                  value={firstName}
                  placeholder="Enter Your First Name"
                  onChange={(event) => setFirstName(event.target.value) }
                  required
            />

             <input
                  name="lastname"
                  type="text"
                  value={lastName}
                  placeholder="Enter your Last Name"
                  onChange={(event) => setLastName(event.target.value) }
                  required
            />

            <input
                  name="username"
                  type="email"
                  value={email}
                  placeholder="Enter your Email Address"
                  onChange={(event) => setEmail(event.target.value) }
                  required
            />

            <input
                  name="username"
                  type="email"
                  value={email}
                  placeholder="Enter your Email Address"
                  onChange={(event) => setEmail(event.target.value) }
                  required
            />

             <input
                  name="email"
                  type="text"
                  value={username}
                  placeholder="Enter your username"
                  onChange={(event) => setUserName(event.target.value) }
                  required
            />

            <input
                  name="password"
                  type="password"
                  value={password}
                  placeholder="Enter Your Password"
                  onChange={(event) => setPassword(event.target.value) }
                  required
            />

              <input
                  name="confirm_password"
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm Your Password"
                  onChange={(event) => setConfirmPassword(event.target.value) }
                  required
            />


          </form>
      </div>

    </div>
    
  );
    
}

export default SignUp