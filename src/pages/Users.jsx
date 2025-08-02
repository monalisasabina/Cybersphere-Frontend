import { useEffect, useState } from "react"

function DisplayUsers(){

    const [users, setUsers] = useState([])

    useEffect(() => {

        const token = localStorage.getItem("access-token")

        fetch("http://127.0.0.1:5555/users",{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setUsers(data)

        })
    },[])

    // Handle Image URL
    function getImageUrl(imagePath) {

        if (!imagePath || typeof imagePath !=="string"){
            return "https://via.placeholder.com/100";
        }

        if (imagePath.startsWith("http://") || imagePath.startsWith("https://")){
            return imagePath
        }

        return `http://127.0.0.1:5555${imagePath}`
           
    }

    return(
        <div>

            <div>
                {users.map((user) => (
                    <div key={user.id}>
                        <p>Name: {user.firstname}</p>
                        <img src={getImageUrl(user.profile_image)}/>

                    </div>
                ))}
            </div>



        </div>
    )
}

export default DisplayUsers