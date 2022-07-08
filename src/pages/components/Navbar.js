

function Navbar({activeUser, logout, setPostPopup, setFollowPopup, setFollowedPopup, buttonPress}) {


    return (
        <div class="navbar" style={{width : "auto" }}>
            <div >
            <img class="navbar-image" src={"https://cdn.pixabay.com/photo/2012/04/18/14/44/bullet-37237_1280.png"} ></img>
            </div>
            <h1 class="navbar-text-logo" >Bulletin Board</h1>
            <p class="navbar-text-loggedIn">Logged in as: {activeUser}</p>
            <h3 class="navbar-button-logout" onClick={() => logout()}>Log out</h3>
            <h3 class="navbar-button-newpost" style={{width : 110}} onClick={() => setPostPopup(true)}>New post</h3>
            <h3 class="navbar-button-newpost" style={{left : 440, width : 110}} onClick={() => setFollowedPopup(true)}>Followed</h3>
            <h3 class="navbar-button-newpost" style={{left : 560, width : 115}} onClick={() => {setFollowPopup(true)}}>Follow+</h3>
            
        </div>
    )
}

export default Navbar;