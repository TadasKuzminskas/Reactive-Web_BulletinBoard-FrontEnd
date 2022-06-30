import { useEffect, useState } from 'react';
import axios from 'axios';
import Comments from '../components/Comments';
import CommentPop from './popups/CommentPopup';
import PostPopup from './popups/PostPopup';


function Posts({activeUser}) {

  const images = [
    "https://bassmagazine.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTYyOTU5MDQ4MTE3ODU1ODMy/elon-musk-flame-bass.jpg",
    "https://m.media-amazon.com/images/I/61Oyk5-WDSL._AC_SX425_.jpg",
    "https://assets.bassbuddha.com/app/uploads/2020/03/Sandberg-California-VS4-Roquefort-Hardcore-Aged-1.jpg",
    "https://pbs.twimg.com/media/FRO9vCaUUAAAfka?format=jpg&name=4096x4096",
    "https://www.purina.ca/sites/g/files/auxxlc601/files/styles/kraken_generic_max_width_960/public/purina-weaning-kittens_1200x500.png?itok=-IDE0kN0",
    "https://i.chzbgr.com/full/9609441024/h28937A04/cat-my-cat-listening-my-rants",
    "https://scontent.fvno2-1.fna.fbcdn.net/v/t1.6435-9/84193105_2588128634754333_4019423797974138880_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=9267fe&_nc_ohc=clV4qNcZSaQAX9vc6GH&_nc_ht=scontent.fvno2-1.fna&oh=00_AT_hr6BpgtIg0_9oaMO6Unk1P23kpK2Std-Hy8NHGuSTFw&oe=62E06AED",
    "https://scontent.fvno2-1.fna.fbcdn.net/v/t1.6435-9/83889424_2585555961678267_6524340332358795264_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=9267fe&_nc_ohc=Xbj5GOag_HEAX8tJ2Co&_nc_ht=scontent.fvno2-1.fna&oh=00_AT99zv-69tPA-7jMSWePA0NcTYEThNiyZgUPf_sA5RN2Ug&oe=62E13903"
  ]

  const [posts, setPosts] = useState([]);
  const [commentPopup, setCommentPopup] = useState(false);
  const [postPopup, setPostPopup] = useState(false);
  const [commentPostId, setCommentPostId] = useState(0)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        var yourURL = "http://localhost:9090/v1/isPublic";
        const response = await axios.get("http://localhost:9090/v1/isPublic")
        setPosts(response.data)
      } catch (err) {
        console.log(err.response.data)
      }
    }
    fetchItems();
  }, [])

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



    return (
        <div>
        <CommentPop trigger={commentPopup} setTrigger={setCommentPopup} activeUser={activeUser} postId={commentPostId}>
            Comment popup
        </CommentPop>
        <PostPopup trigger={postPopup} setTrigger={setPostPopup} posts={posts} setPosts={setPosts} activeUser={activeUser}>
          Post popup
        </PostPopup>
        <div class="card">
          <h4 onClick={() => setPostPopup(true)}>New post</h4>
        </div>
    <div class="container">
          {posts.map((post) => (
        <div class="card">
          <p>{post.username} {renderDeletePostButton(post)}</p>
          <img class="card-image" src={images[Math.floor(Math.random()*images.length)]}></img>
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
  