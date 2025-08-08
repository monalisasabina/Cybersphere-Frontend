import { useEffect, useState } from "react"
import loadingGif from "../Pictures/ef8bbd4554dedcc2fd1fd15ab0ebd7a1.gif"
import { MdArrowForwardIos } from "react-icons/md";
import NameChangeModal from "../modal/changeNameModal";
import EmailChangeModal from "../modal/changeEmailModal";
import "./UpdateUser.css";


function UpdateUser(){

    const [modalOpen, setModal] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    const openModal = (type) => {
        setModal(type);
    };

    const closeModal = () => {
        setModal(null);
    };

   
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
           
        })
        .catch((err) => console.error("CheckSession error:", err))
    }, []);

  
    return(
        <div>
            <h2>Profile</h2>

            {currentUser ? (
                <div className="update-card">

                    <h3>Update Profile</h3>

                    <div className="update-row" onClick={() => openModal('name')}>
                        <span>Names</span>
                        <span> <MdArrowForwardIos /> </span>
                    </div>

                    <div className="update-row" onClick={() => openModal('email')}>
                        <span>Email</span>
                        <span> <MdArrowForwardIos /> </span>
                    </div>

                    {/* Conditions for modal */}
                    {modalOpen === "name" && 
                               <NameChangeModal 
                                         key={currentUser.id}
                                         onClose={closeModal} 
                                         currentUser={currentUser}
                                        
                    />}
                    {modalOpen === "email" && 
                               <EmailChangeModal
                                         key={currentUser.id}
                                         onClose={closeModal} 
                                         currentUser={currentUser}
                                         
                    />}

                </div>

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