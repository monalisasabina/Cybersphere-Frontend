import { useNavigate } from "react-router-dom"
import ErrorPic from "../Pictures/404-404error.gif"
import "./ErrorPage.css"

function ErrorPage(){

    const navigate = useNavigate();

    return(
        <div className="error-cont" >
            <h1 className="error-page-title">ERROR!</h1>

            <img  className="error-page-image" src={ErrorPic} alt="Error"  />

            <p className="error-page-message">Sorry, the page you are looking for does not exist.</p>

            <button className="error-page-button" onClick={() => navigate("/")}>Go to Home</button>

        </div>
    )
}

export default ErrorPage
