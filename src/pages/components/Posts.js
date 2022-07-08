import { useEffect, useState } from 'react';
import axios from 'axios';
import Comments from '../components/Comments';
import CommentPop from './popups/CommentPopup';
import PostPopup from './popups/PostPopup';
import FollowPopup from './popups/FollowPopup';
import FollowedPopup from './popups/FollowedPopup';


function Posts({activeUser, posts, setPosts, commentPopup, setCommentPopup, postPopup, setPostPopup, followPopup, setFollowPopup, followedPopup, setFollowedPopup, followed, setFollowed}) {

  const [commentPostId, setCommentPostId] = useState(0)

  function renderDeletePostButton(post) {

    function deletePost(postId) {

      axios.delete(`http://localhost:9090/v1/post/${postId}`).then( response => {
        console.log(response)
        setPosts(current => 
          current.filter(post1 => {
            return post1.content !== post.content
          })
          )
      }
      )
      console.log("delete button pressed")
    }

    if(post.username == activeUser) {
      return <text class="delete-button" onClick={() => deletePost(post.id)}>Delete Post</text>
    }
  }

  function postColor(boolean) {
    if (boolean) {
      return "#fffff"
    } else {
      return "#faf6eb" 
    }
  }
    return (
        <div>
        <CommentPop trigger={commentPopup} setTrigger={setCommentPopup} activeUser={activeUser} postId={commentPostId}/>
        <PostPopup trigger={postPopup} setTrigger={setPostPopup} posts={posts} setPosts={setPosts} activeUser={activeUser}/>
        <FollowPopup trigger={followPopup} setTrigger={setFollowPopup} activeUser={activeUser}></FollowPopup>
        <FollowedPopup trigger={followedPopup} setTrigger={setFollowedPopup} activeUser={activeUser} followed={followed} setFollowed={setFollowed}/>
    <div class="container">
          {posts.map((post) => (
        <div key={post.id} class="card" style={{background: postColor(post.isPublic)}}>
          <h2>{post.username}</h2>
          <p>{renderDeletePostButton(post)}</p>
          <img class="card-image" src={post.image} alt="Image not available"></img>
          <h3>{post.name}</h3>
          <p>{post.content}</p>
          <Comments postId={post.id} activeUser={activeUser}/>
          <a class="comment-button" onClick={() => {setCommentPopup(true); setCommentPostId(post.id)}} >comment</a>
          </div>
      ))}
    </div>
    </div>
    );
  }
  
  export default Posts;
  