import { useRef, useState } from "react";
import "./SignUp.css"
import { data } from "react-router-dom";

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

   // Handle Box Click________________________________________________________________________
   const handleBoxClick = () => {
         fileInputRef.current.click();
   }

   // Handle file selection______________________________________________________________________
   const handleFileChange = (event) => {
      
      const file = event.target.files[0];

      if (file) {
            setProfilePic(file);
            setPreview(URL.createObjectURL(file))
      }
   };


    //Hanfle submit form__________________________________________________________________________
    const  handleSubmit = async (event) => {

      event.preventDefault();

      // Signing up the user
      const response = await fetch("http://127.0.0.1:5555/signup", {
            method: "POST",
            headers: {
                  "Content-Type":" application/json"
            },
            body: JSON.stringify({
                  firstname: firstName,
                  lastName: lastName,
                  username,
                  email,
                  password,
                  confirm_password: confirmPassword
            }),
      });

      const data = await response.json();

      if(response.ok){
         const token =data.access_token;
      }

      // Uploading photo
      if (profilePic) {

            const formData = new FormData();
            formData.append("image", profilePic);

            const uploadRes = await fetch("http://127.0.0.1:5555/upload", {
                  method:"POST",
                  // headers: {
                  //       Authorization: `Bearer ${token}}`
                  // },
                  body: formData,
            });

            const uploadData = await uploadRes.json();
            console.log("Upload response", uploadData);

      } else {
            console.log("Signup failed", data)
      }
    };    


  return (
    <div>

      <h2>Sign Up Page</h2>

      <div>
          <form onSubmit={handleSubmit}>
            {/* <input 
                  name="profile_pic"
                  type="file"
                  value={profilePic}
                  onChange={(event) => setProfilePic(event.target.value)}
            /> */}

            <div className="box_click" onClick={handleBoxClick}>
                  {preview ? (
                        <img src={preview} alt="Profile pic preview" style={{ width: "100px"}}/>
                  ) : (
                        <p>Click to select profile</p>
                  )}
            </div>

            <input 
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none"}}
                  accept="image/*"
                  onChange={handleFileChange}
            />

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
                  type="text"
                  value={username}
                  placeholder="Enter your username"
                  onChange={(event) => setUserName(event.target.value) }
                  required
            />

            <input
                  name="email"
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={(event) => setEmail(event.target.value) }
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

            <button type="submit">ADD USER</button>
          </form>
      </div>

    </div>
    
  );
    
}

export default SignUp