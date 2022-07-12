import { useEffect, useState } from "react";
import axios from "axios";
import Posts from "./components/Posts";
import Navbar from "./components/Navbar";

function HomePage() {
  function logout() {
    console.log("logout button pressed.");

    //localStorage.setItem("username", "")
    localStorage.setItem("token", "");

    window.location.href = "/login";
  }

  const [posts, setPosts] = useState([]);
  const [commentPopup, setCommentPopup] = useState(false);
  const [postPopup, setPostPopup] = useState(false);
  const [followPopup, setFollowPopup] = useState(false);
  const [followedPopup, setFollowedPopup] = useState(false);
  const [followed, setFollowed] = useState([]);
  const [pagePublic, setPagePublic] = useState(0);
  const [pagePrivate, setPagePrivate] = useState(0);
  const [activeUser, setActiveUser] = useState([]);

  const updateFollowed = (followed) => {
    setFollowed(followed);
  };

  const updatePosts = (post) => {
    setPosts(post);
  };

  const updateCommentPopup = (boolean) => {
    setCommentPopup(boolean);
  };

  const updatePostPopup = (boolean) => {
    setPostPopup(boolean);
  };

  const updateFollowPopup = (boolean) => {
    setFollowPopup(boolean);
  };

  const updateFollowedPopup = (boolean) => {
    setFollowedPopup(boolean);
  };

  function buttonPress() {
    console.log("Button pressed.");
  }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const activeUserFetch = await axios.get(
          "http://localhost:9090/v1/activeUser"
        );
        setActiveUser(activeUserFetch.data);
        const response1 = await axios.get(
          `http://localhost:9090/v1/friends/${activeUserFetch.data.username}`
        );
        setFollowed(response1.data);
      } catch (err) {
        console.log(err);
      }

      try {
        const response = await axios.get(
          `http://localhost:9090/v1/isPublic/${pagePublic}`
        );
        const response3 = await axios.get(
          `http://localhost:9090/v1/isPrivate/${pagePrivate}`
        );
        setPagePublic(pagePublic + 5);
        setPagePrivate(pagePrivate + 2);
        var array = [...response.data, ...response3.data];
        array.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        setPosts(array);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    fetchItems();
    // Make sure to probvide dependencies to react hooks that use deps.
    // When not providing them it will not run useEffect when those values change
    // and will only run once on initial render.
    // Unless that was your intention.
  }, [pagePrivate, pagePublic]);

  const addPages = async () => {
    setPagePublic(pagePublic + 5);
    setPagePrivate(pagePrivate + 2);
    const response = await axios.get(
      `http://localhost:9090/v1/isPublic/${pagePublic}`
    );
    const response3 = await axios.get(
      `http://localhost:9090/v1/isPrivate/${pagePrivate}`
    );
    var array = [...response.data, ...response3.data];
    var array2 = [...array, ...posts];
    array2.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    setPosts(array2);
  };

  return (
    <div>
      <Navbar
        activeUser={activeUser.username}
        logout={logout}
        setPostPopup={updatePostPopup}
        setFollowPopup={updateFollowPopup}
        setFollowedPopup={updateFollowedPopup}
        buttonPress={buttonPress}
      />
      <Posts
        activeUser={activeUser.username}
        posts={posts}
        setPosts={updatePosts}
        commentPopup={commentPopup}
        setCommentPopup={updateCommentPopup}
        postPopup={postPopup}
        setPostPopup={updatePostPopup}
        followPopup={followPopup}
        setFollowPopup={updateFollowPopup}
        followedPopup={followedPopup}
        setFollowedPopup={updateFollowedPopup}
        followed={followed}
        setFollowed={updateFollowed}
      />
      <div
        className="comment-button"
        style={{ width: 200, backgroundColor: "orange" }}
        onClick={() => {
          addPages();
        }}
      >
        <h3>Load More...</h3>
      </div>
    </div>
  );
}

export default HomePage;
