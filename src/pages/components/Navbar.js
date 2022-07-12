

function Navbar({activeUser, logout, setPostPopup, setFollowPopup, setFollowedPopup, buttonPress}) {

    


    return (
        <div className="navbar" style={{width : "auto" }}>
            <img className="navbar-image" src={"https://cdn.pixabay.com/photo/2012/04/18/14/44/bullet-37237_1280.png"} ></img>
            <h1 className="navbar-text-logo" >Bulletin Board</h1>
            <h3 className="navbar-button-newpost" onClick={() => setPostPopup(true)}>New post</h3>
            <h3 className="navbar-button-newpost" onClick={() => setFollowedPopup(true)}>Followed</h3>
            <h3 className="navbar-button-newpost" onClick={() => {setFollowPopup(true)}}>Follow+</h3>
            <h3 className="navbar-text-loggedIn"> {activeUser}</h3>
            <h3 className="navbar-button-logout" onClick={() => logout()}>Log out</h3>
        </div>
    )
}

export default Navbar;