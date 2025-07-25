import { useState} from "react"
import { useNavigate, Link} from "react-router-dom";

function LogIn(){
    
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
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
      localStorage.setItem("token", data.access_token);
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
            <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="Username or Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
          </form>

          <div>
             <p>
               <Link to="/forgotpassword"> Forgot Password</Link>
             </p>
          </div>
       </div>
  );
    
}

export default LogIn