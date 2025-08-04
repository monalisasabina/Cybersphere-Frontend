import { useState} from "react"
import { useNavigate, Link} from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import "./login.css"


function LogIn(){
    
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:5555/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        username: identifier,  // Can be username or email
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("access-token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      alert("Login success");
      navigate("/dashboard");
    } else {
      alert(data.error || "Login failed");
    }
  };

  return (
       <div>
         <form onSubmit={handleLogin}>
            <h2>Login</h2>
            
          {/* USERNAME/EMAIL */}
           <div  className="login-input-wrapper"   >
               <input 
                     value={identifier} 
                     onChange={(e) => setIdentifier(e.target.value)} 
                     placeholder="Username or Email"
               />
           </div>

           {/* PASSWORD */}
            <div className="login-input-wrapper">

               <input 
                 type= {visible ? "text": "password"}
                 value={password} 
                 onChange={(e) => setPassword(e.target.value)} 
                 placeholder="Password" 
               />

                <span className="login-icon" onClick={() => setVisible(!visible)}>
                     { visible ?  <FaRegEye /> : <FaRegEyeSlash/> }
                </span>

            </div>
           

            <button className="login-btn" type="submit">Login</button>

            <div className="login-input-wrapper">  
                <p>
                  <Link to="/forgotpassword"> Forgot Password</Link>
                </p>
          </div>
          </form>

        
       </div>
  );
    
}

export default LogIn