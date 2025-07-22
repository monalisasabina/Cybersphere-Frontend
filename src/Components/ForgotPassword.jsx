import { useState } from "react";

function ForgotPassword(){

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [resetLink, setResetLink] = useState("");

    // Handle Submit--------------------------------------------------------------
    const handleSubmit = async(e) =>{

        e.preventDefault();

        try{
            const response = await fetch("http://127.0.0.1:5555/forgotpassword", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email}),
            });

            const data = await response.json();
            setMessage(data.message);
            console.log(data.message)

            if (data.reset_link){
                console.log("Reset link", data.reset_link)
                setResetLink(data.reset_Link);
            }
        } catch (error){
            console.error("Error", error);
            setMessage("An error has occured.");
        }
    }


    return(

        <div>
            <h2>Forgot Password</h2>

            <div>
                <form onSubmit={handleSubmit}>
                    <input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required

                    />

                    <button type="submit">Send Reset Link</button>

                </form>
            </div>

            {message && <p>{message}</p>}

            {resetLink &&  (
                <p>
                    🔗 Reset Link (testing):{" "}
                    <a href={resetLink} target="_blank" rel="noopener noreferrer"> Reset Password</a>
                </p>
            )}
            
        </div>


    )
}

export default ForgotPassword