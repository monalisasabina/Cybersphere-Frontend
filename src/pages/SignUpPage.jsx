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
  const [preview, setPreview] = useState(null);
  const [adminCode, setAdminCode] = useState("");
  const [role, setRole] = useState("Other Employee");
  const [message, setMessage] = useState("");

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

      // Confirm password check
      if (password !== confirmPassword){
            setMessage("Passwords do not match")
      }

      let token = null;
     
      try{
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
                  confirm_password: confirmPassword,
                  role: role,
                  admin_code: adminCode
                  
            }),
      });
 
      const data = await response.json();

      if(response.ok){
           token = data.access_token;
           setMessage("SignUp Succesful!")
      } else {
           setMessage(data.message || "SignUp failed!")
      }

      // Uploading photo
      if (profilePic) {

            const formData = new FormData();
            formData.append("image", profilePic);

            const uploadRes = await fetch("http://127.0.0.1:5555/upload", {
                  method:"POST",
                  headers: {
                        Authorization: `Bearer ${token}}`
                  },
                  body: formData,
            });

            const uploadData = await uploadRes.json();
            console.log("Upload response", uploadData);

            if (!uploadRes.ok){
                  setMessage(uploadData.message || "Image upload failed.")
                  return;            
            }   

            console.log("Image uploaded succeessfully", uploadData);
            setMessage("SignUp and Image uploaded successfully!")
     
          }
          
      } catch (err) {
            console.error("SignUp Error");
            setMessage("An unexpected error occured.")
      }
    };    


  return (
    <div>

      <h2>Sign Up Page</h2>

      <div>
          <form onSubmit={handleSubmit}>
           
           {/* Box click */}
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

            <input 
                  name="admin_code"
                  type="password"
                  value={adminCode}
                  placeholder="Enter Admin Code"
                  onChange={(event) => setAdminCode(event.target.value)}
            />

            <select value={role} onChange={(event) => setRole(event.target.value) }>
                 <option value="Admin">Admin</option> 
                 <option value="Other Employee">Other Employee</option>
            </select>

            <button type="submit">ADD USER</button>
          </form>

          {message && <p className="message">{message}</p>}
      </div>

    </div>
    
  );
    
}

export default SignUp