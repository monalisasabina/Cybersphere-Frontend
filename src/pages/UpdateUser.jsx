import { useEffect, useState } from "react"
import loadingGif from "../Pictures/ef8bbd4554dedcc2fd1fd15ab0ebd7a1.gif"

function UpdateUser(){

    const [currentUser, setCurrentUser] = useState(null)
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
    });

    // Check Session, to update current user ONLY
    useEffect(() => {
        const token = localStorage.getItem("access-token")

        fetch("http://127.0.0.1:5555/check_session", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response)=> response.json())
        .then((data) => {
            setCurrentUser(data.user);
            setFormData({
                firstname: data.user.firstname || "",
                lastname: data.user.lastname || "",
                email: data.user.email || "",
            });
        })
        .catch((err) => console.error("CheckSession error:", err))
    }, []);

    // Handle Change
    const handleChange = (event) => {

        const {name, value} = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle Submit
    const handleSubmit = async (event) => {

        event.preventDefault();

        const token = localStorage.getItem("access-token");

        console.log(currentUser)

        try{
            const response = await fetch(`http://127.0.0.1:5555/users/${currentUser.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const error = await response.json()
                console.log("Update failed:",error)
                return;
            } 

            const updatedUser = await response.json();
            console.log("User updated successfully", updatedUser);
            alert("Profile updated!")
        
        } catch (err){
            console.error("Update error:",err)
        }

    };

    return(
        <div>
            <h2> Edit Your Profile</h2>

            {currentUser ? (
    
               <form onSubmit={handleSubmit}>  
                   <div className="input-wrapper">
                       <input
                           name="firstname"
                           type="text"
                           placeholder="First Name"
                           value={formData.firstname}
                           onChange={handleChange}
                        />
                     </div>

                      <div className="input-wrapper">
                       <input
                           name="lastname"
                           type="text"
                           placeholder="Last Name"
                           value={formData.lastname}
                           onChange={handleChange}
                        />
                     </div>

                      <div className="input-wrapper">
                       <input
                           name="email"
                           type="email"
                           placeholder="Email"
                           value={formData.email}
                           onChange={handleChange}
                        />
                     </div>

                     <button type="submit">Update Profile</button>
                </form>

            ) : (
                <>
                   <p>Loading profile...</p>
                   <img src={loadingGif} />
                </>
                

            )}


        </div>
    )
}

export default UpdateUser