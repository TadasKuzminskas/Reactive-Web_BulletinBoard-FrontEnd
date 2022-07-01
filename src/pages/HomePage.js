import { useEffect, useState } from 'react';
import api from '../api/baseURL';
import axios from 'axios';
import Posts from './components/Posts';
import Navbar from './components/Navbar';


function HomePage() {

  var activeUser = localStorage.getItem("username")

  function logout() {
    console.log("logout button pressed.")

    localStorage.setItem("username", "")
    localStorage.setItem("token", "");

    window.location.href = '/login'

  }

  const [posts, setPosts] = useState([]);
  const [commentPopup, setCommentPopup] = useState(false);
  const [postPopup, setPostPopup] = useState(false);
  const [followPopup, setFollowPopup] = useState(false);
  const [followedPopup, setFollowedPopup] = useState(false);
  const [followed, setFollowed] = useState([])

  function buttonPress() {
    console.log("Button pressed.")
  }

  

  useEffect(() => {
    const fetchItems = async () => {
      try {
        var yourURL = "http://localhost:9090/v1/isPublic";
        const response = await axios.get("http://localhost:9090/v1/isPublic")
        setPosts(response.data)
      } catch (err) {
        console.log(err.response.data)
      }

      try {
        const response1 = await axios.get(`http://localhost:9090/v1/friends/${activeUser}`)
        setFollowed(response1.data)
      } catch (err) {
        console.log(err.response.data)
      }
    }
    fetchItems();
  }, [])


    return (
      <div>
        <Navbar activeUser={activeUser} logout={logout} setPostPopup={setPostPopup} setFollowPopup={setFollowPopup} setFollowedPopup={setFollowedPopup} buttonPress={buttonPress}/>
         <Posts activeUser={activeUser} 
        posts={posts}
        setPosts={setPosts}
        commentPopup={commentPopup}
        setCommentPopup={setCommentPopup}
        postPopup={postPopup}
        setPostPopup={setPostPopup}
        followPopup={followPopup}
        setFollowPopup={setFollowPopup}
        followedPopup={followedPopup}
        setFollowedPopup={setFollowedPopup}
        followed={followed}
        setFollowed={setFollowed}
        />
      </div>
    );
  }
  
  export default HomePage;
  