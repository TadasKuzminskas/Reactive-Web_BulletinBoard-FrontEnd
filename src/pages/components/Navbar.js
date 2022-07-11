

function Navbar({activeUser, logout, setPostPopup, setFollowPopup, setFollowedPopup, buttonPress}) {


    return (
        <div class="navbar" style={{width : "auto" }}>
            <img class="navbar-image" src={"https://cdn.pixabay.com/photo/2012/04/18/14/44/bullet-37237_1280.png"} ></img>
            <h1 class="navbar-text-logo" >Bulletin Board</h1>
            <h3 class="navbar-button-newpost" onClick={() => setPostPopup(true)}>New post</h3>
            <h3 class="navbar-button-newpost" onClick={() => setFollowedPopup(true)}>Followed</h3>
            <h3 class="navbar-button-newpost" onClick={() => {setFollowPopup(true)}}>Follow+</h3>
            <p class="navbar-text-loggedIn">User: {activeUser}</p>
            <h3 class="navbar-button-logout" onClick={() => logout()}>Log out</h3>
        </div>
    )
}

export default Navbar;