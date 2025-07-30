import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";


function ResetPassword(){

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [visible, setVisible] = useState(false)
    const [visibleConfirm, setVisibleConfirm] =useState(false)


  
    // Handle Reset ______________________________________________________________________
    const handleReset = async (e) => {
        e.preventDefault();

        // Confirm Password____________________________________________________________________
        if (password !== confirmPassword){
            setMessage("Passwords do not match!")
            return;
        }

        try {
            const response = await fetch ("http://127.0.0.1:5555/resetpassword", {
                method: "POST",
                headers: {
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ new_password: password}),
            });

            const data = await response.json();

            if (response.ok){
                setMessage("Password reset successful")
                setTimeout(() => navigate("/login"), 2000)

            } else {
                // setMessage(data.message || "Reset failed."); 

                const errorMessage = data?.message || "Reset failed.";

                if (errorMessage.includes("expired") || errorMessage.includes("Invalid")){
                    setMessage("Link expired. Please request a new one.")
                } else {
                    setMessage(errorMessage);
                }
            }

        } catch (error){
            console.error (error);
            setMessage("Something went wrong")
        }
    }


    return(
        <div>
            <h2>Reset Your Password</h2>

            <div>
                <form onSubmit={handleReset}>
                    <input 
                          type= {visible ? "text": "password"}
                          placeholder="Enter new password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          required
                    />
                    <div onClick={() => setVisible(!visible)}>
                          { visible ?  <FaRegEye /> : <FaRegEyeSlash/> }
                    </div>

                    <input
                          type= {visibleConfirm ? "text": "password"}
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(event) => setConfirmPassword(event.target.value)}
                          required
                    />
                    <div onClick={() => setVisibleConfirm(!visibleConfirm)}>
                          { visibleConfirm ?  <FaRegEye /> : <FaRegEyeSlash/> }
                    </div>

                    <button type="submit">Reset Password</button>
                </form>

                {message && <p>{message}</p>}

                {message.includes("expired") && (
                    <button onClick={() => navigate("/forgotpassword") }> Request New Reset Link</button>
                )}
            </div>

        </div>
    )
}

export default ResetPassword