import { useEffect, useState } from "react"
import "./welcomemodal.css"


function NameChangeModal({onClose, currentUser}){

    const [firstNameChange, setFirstNameChange] = useState("");
    const [lastNameChange, setLastNameChange] = useState("");
   
    
    // Prefill with current user data
    // Avoiding one of the name fields going blank
        useEffect(() => {
             console.log("Modal opened with user:", currentUser);
            setFirstNameChange(currentUser.firstname || "");
            setLastNameChange(currentUser.lastname || "");
        },[currentUser])


    // Handle Name Change Submit
    const handleNameSubmit = async (event) => {

        event.preventDefault();

        const token = localStorage.getItem("access-token");


        // Avoiding one of th fields going blank
        // Build update payload dynamically...............
        const updatedFields = {};

        if (firstNameChange !== currentUser.firstname && firstNameChange.trim() !== ""){
            updatedFields.firstname = firstNameChange;
        }
        if (lastNameChange !== currentUser.lastname  && lastNameChange.trim() !== ""){
            updatedFields.lastname = lastNameChange;
        }

        if (Object.keys(updatedFields).length === 0){
            alert("No changes made.")
            return;
        }
        // ...................................................


        // API: Update fields
        try{
            const response = await fetch(`http://127.0.0.1:5555/users/${currentUser.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedFields)
            });

            const data = await response.json();
          
            if (response.ok) {
              alert("Name updated successfully")
              onClose();
            } else {
                alert("Failed to update")
            }

        } catch (err){
            console.error("Update error:",err)
        }
    }

    return(
        <div className="modal-overlay">

            <div className="modal">

              <form onSubmit={handleNameSubmit}>

                <h3>Update Names</h3>

                <div className="input-wrapper">

                   <input 
                        name="firstname_change"
                        placeholder="First Name"
                        type="text"
                        value={firstNameChange}
                        onChange={(event) => setFirstNameChange(event.target.value)}
                        autoComplete="off"
                   />

                </div>

                  <div className="input-wrapper">

                   <input 
                        name="lastname_change"
                        placeholder="Last Name"
                        type="text"
                        value={lastNameChange}
                        onChange={(event) =>setLastNameChange(event.target.value)}
                        autoComplete="off"
                   />

                </div>
                
                <button type="submit">Save</button>
                <button type="button" onClick={onClose}>Cancel</button>

               </form>
            </div>

            

           

        </div>
    )
}
export default NameChangeModal