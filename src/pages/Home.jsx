import "./Home.css";
import heroImage from "../Pictures/ChatGPT Image Aug 8, 2025, 01_24_41 PM.png"
import { useNavigate } from "react-router-dom";

// Also known as the Hero Section 😁
function Home(){

    const navigate = useNavigate();

    return(
         <div className="hero-cont">

             <div className="hero-image hero-fade-in">
                 <img src={heroImage} alt="Hero" />
             </div>
            
            <div className="hero-text hero-slide-up" >

                <h1 className="hero-title"> Building with Purpose, Designing with Care</h1>
                <p className="hero-subtitle">Your partner for innovative, reliable, and efficient engineering solutions.</p>

                <div className="hero-buttons">

                    <button
                          onClick={() => navigate("/projects")} 
                          className="hero-cta"
                          >See Our Work
                    </button>

                    <button
                          onClick={() => navigate("/contact_us")}
                          className="hero-cta"
                          >Contact Us
                    </button>
                </div> 
            </div>
         </div>

    )
}

export default Home