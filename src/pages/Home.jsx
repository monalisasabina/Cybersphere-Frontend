import "./Home.css";
import heroImage from "../Pictures/ChatGPT Image Aug 8, 2025, 01_24_41 PM.png"
// Also known as the Hero Section 😁
function Home(){

    return(
         <div className="hero-cont">

             <div className="hero-image">
                 <img src={heroImage} alt="Hero" />
             </div>
            
            <div className="hero-text">

                <h1 className="hero-title"> Building with Purpose, Designing with Care</h1>
                <p className="hero-subtitle">Your partner for innovative, reliable, and efficient engineering solutions.</p>

                <div className="hero-buttons">
                    <button className="hero-cta">Get Started</button>
                    <button className="hero-cta">See Our Work</button>
                </div>
            
            </div>

             

            
         </div>

    )
}

export default Home