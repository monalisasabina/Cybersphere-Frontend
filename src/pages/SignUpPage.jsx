import { useRef, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import "./SignUp.css"
import { Navigate } from "react-router-dom";
import WelcomeModal from "../modal/welcomemodal";


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
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState([])
  const [visible, setVisible] = useState(false)
  const [visibleConfirm, setVisibleConfirm] =useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)


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

   //Handle username suggestions
   const handleUsernameSuggesstions = async () => {
         
        if (!firstName || !lastName) {
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5555/suggest-username",{
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json"
                  }, 
                  body: JSON.stringify({
                        firstname:firstName, 
                        lastname:lastName
                     })
            })
            const data = await response.json();

            if (response.ok) {
                  setSuggestions(data.suggestions)
            } else {
                  console.error(data.error || "Failed to fetch suggestions")
            }
       
         } catch(error) {
            console.error("Error fetching suggestions", error);
         }
   }    


    //Handle submit form__________________________________________________________________________
    const  handleSubmit = async (event) => {

      event.preventDefault();

      // Confirm password check
      if (password !== confirmPassword){
            setMessage("Passwords do not match")
            return;
      }

      const token = localStorage.getItem("access-token");
      // console.log(token)

      if (!token) {
            setMessage("You are not authorized. Please log in first.")
            return;
      }
      if(token.split('.').length !==3){
            setMessage("Invalid token format. Please log in again.")
            return;
      }
     
      let uploadedImageName = "";

      try{
         // Uploading photo
         if (profilePic) {

            const formData = new FormData();
            formData.append("image", profilePic);

            const uploadRes = await fetch("http://127.0.0.1:5555/upload", {
                  method:"POST",
                  headers: {
                        Authorization: `Bearer ${token}`
                  },
                  body: formData,
            });

            const uploadData = await uploadRes.json();
            console.log("Upload response", uploadData);

            if (!uploadRes.ok){
                  setMessage(uploadData.message || "Image upload failed.")
                  return;            
            }
            
            uploadedImageName = uploadData.filename
            
            console.log("Image uploaded succeessfully", uploadData);
            setMessage("SignUp and Image uploaded successfully!")
     
          }

          // Signing up the user   
         const response = await fetch("http://127.0.0.1:5555/signup", {
            method: "POST",
            headers: {
                  "Content-Type":" application/json",
                   Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                  firstname: firstName,
                  lastname: lastName,
                  username: username,
                  email: email,
                  password: password,
                  role: role,
                  admin_code: adminCode,
                  is_admin: role === "Admin",
                  profile_image: uploadedImageName
                  
            }),
      });
 
      const data = await response.json();
      console.log(data)

      if(response.ok){
           const newToken = data.access_token;
           setMessage("SignUp Succesful!")

           setShowWelcomeModal(true);
           setTimeout(() => {
               setShowWelcomeModal(false)
           },3000)
           
      } else {
           setMessage(data.message || "SignUp failed!")
           console.log("SignUp error:", data)
      }

     
      } catch (err) {
            console.error("SignUp Error", err);
            setMessage("An unexpected error occured.")
      }
    };    


  return (
    <div>

      <h2>Sign Up Page</h2>

      {/* Show welcome Modal */}
      {showWelcomeModal && <WelcomeModal name={firstName} />}

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
           
            {/* FIRSTNAME */}
             <div className="input-wrapper">
               <input
                    name="firstname"
                    type="text"
                    value={firstName}
                    placeholder="Enter Your First Name"
                    onChange={(event) => setFirstName(event.target.value) }
                    required
                  />
            </div>

            {/* LASTNAME */}
            <div className="input-wrapper">
                <input
                    name="lastname"
                    type="text"
                    value={lastName}
                    placeholder="Enter your Last Name"
                    onChange={(event) => setLastName(event.target.value) }
                  required
                 />
            </div>

             
            {/* USERNAME */}
            <div className="input-wrapper">
                <input
                  name="username"
                  type="text"
                  value={username}
                  placeholder="Enter your username"
                  onChange={(event) => setUserName(event.target.value) }
                  required
                 />    

                 <button onClick={handleUsernameSuggesstions}
                    className="form_button"
            
                    >Suggest Username
                  </button>
            </div>
           
            <div>
                  {suggestions.length >0 && (
                        <ul>
                              {suggestions.map((username, index) =>(
                                    <li key={index}>{username}</li>
                               ))}
                        </ul>
                  )}
            </div>
      

            {/* EMAIL */}
            <div className="input-wrapper">
                <input
                    name="email"
                    type="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={(event) => setEmail(event.target.value) }
                    required
            />
            </div>
           

            {/* PASSWORD */}
            <div className="input-wrapper">
               <input
                    name="password"
                    type= {visible ? "text": "password"}
                    value={password}
                    placeholder="Enter Your Password"
                    onChange={(event) => setPassword(event.target.value) }
                    required
               />

               <span  className="icon" onClick={() => setVisible(!visible)}>
                          { visible ?  <FaRegEye /> : <FaRegEyeSlash/> }
               </span>
            </div>
            


           {/* CONFIRM PASSWORD */}
           <div className="input-wrapper">
               <input
                  name="confirm_password"
                  type= {visibleConfirm ? "text": "password"}
                  value={confirmPassword}
                  placeholder="Confirm Your Password"
                  onChange={(event) => setConfirmPassword(event.target.value) }
                  required
               />

               <span className="icon" onClick={() => setVisibleConfirm(!visibleConfirm)}>
                          { visibleConfirm ?  <FaRegEye /> : <FaRegEyeSlash/> }
               </span>
           </div>
          


            {/* ADMIN CODE */}
            <div className="input-wrapper">
               <input 
                   name="admin_code"
                   type="password"
                   value={adminCode}
                   placeholder="Enter Admin Code"
                   onChange={(event) => setAdminCode(event.target.value)}
                />
            </div>
           

            {/*ROLE */}
            <div className="select-wrapper">
                <select value={role} onChange={(event) => setRole(event.target.value) }>
                    <option>--Please Choose A Role--</option>
                    <option value="Admin">Admin</option> 
                    <option value="Other Employee">Other Employee</option>
                </select>
            </div>
            <button type="submit" className="form_button"> ADD USER</button>
      
          </form>

          {message && <p className="message">{message}</p>}
      </div>

    </div>
    
  );
    
}

export default SignUp