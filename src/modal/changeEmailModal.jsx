import {useState } from "react"
import "./welcomemodal.css"


function EmailChangeModal({onClose, currentUser}){

    const [emailChange, setEmailChange] = useState("");
   
    // Handle Email Change Submit
    const handleEmailSubmit = async (event) => {

        event.preventDefault();

        const token = localStorage.getItem("access-token");


        // API: Update fields
        try{
            const response = await fetch(`http://127.0.0.1:5555/users/${currentUser.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({email : emailChange}),
            });

            const data = await response.json();
            console.log("Update response:", data);
          
            if (response.ok) {
              alert("Email updated successfully")
              onClose();
            } else {
                alert(data?.error || "Failed to update")
            }

        } catch (err){
            console.error("Update error:",err)
        }
    }

    return(
        <div className="modal-overlay">

            <div className="modal">

              <form onSubmit={handleEmailSubmit}>

                <h3>Update Email</h3>

                <div className="input-wrapper">

                   <input 
                        name="email_change"
                        placeholder="Enter Email"
                        type="email"
                        value={emailChange}
                        onChange={(event) => setEmailChange(event.target.value)}  
                   />
                </div>

                <button type="submit">Save</button>
                <button type="button" onClick={onClose}>Cancel</button>

               </form>
            </div>

        </div>
    )
}
export default EmailChangeModal