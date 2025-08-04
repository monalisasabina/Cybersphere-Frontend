import "./welcomemodal.css"

function WelcomeModal({name}){

    return(
        <div className="modal-overlay">
            <div className="modal">
                <h3>Welcome, {name}</h3>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyjQEE1xsoOo7gRrvMLpx_jeovUi_Fq3gBfzluwoXTvUyKtXGR9la-6S4&s"/>
                <p>Your account has been created successfully</p>
            </div>

        </div>
    )
}
export default WelcomeModal