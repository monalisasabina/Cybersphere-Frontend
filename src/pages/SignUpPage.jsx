import { useState } from "react";

function SignUp(){

    const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    role: "user",
    admin_code: "", // Required
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:5555/signup", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful!");
    } else {
      alert(data.error || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input name="firstname" placeholder="First Name" onChange={handleChange} required />
      <input name="lastname" placeholder="Last Name" onChange={handleChange} required />
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <input name="role" placeholder="Role (e.g. user)" onChange={handleChange} required />
      <input name="admin_code" placeholder="Admin Code" onChange={handleChange} required />
      <button type="submit">Sign Up</button>
    </form>
  );
    
}

export default SignUp