import { useState } from "react";
import axios from "axios";
import Posts from "../Posts";
import { fetchRefreshToken } from '../../../helpers/RefreshTokenInitializer'


function PostPopup(props) {

    const [postContent, setPostContent] = useState("");
    const [postName, setPostName] = useState("");
    const [postImage, setPostImage] = useState("")
    const [isPublic, setIsPublic] = useState(false)

    function handlePostContentChange(event) {
        setPostContent(event.target.value);
      }

    function handlePostNameChange(event) {
        setPostName(event.target.value);
    }

    function handlePostImageChange(event) {
        setPostImage(event.target.value);
    }

    function handleIsPublicChange(event) {
        setIsPublic(!isPublic);
    }

    function postPost() {
        const postToPost = {
            id: 0,
            name: postName,
            content: postContent,
            isPublic: isPublic,
            username: props.activeUser,
            image: postImage
        }

        props.setTrigger(false)
        axios.post("http://localhost:9090/v1/post", postToPost)
        .then(response => {
            postToPost.id = response.data
            console.log(postPost)
            console.log(props.setPosts)
            props.setPosts([postToPost, ...props.posts])
    }).catch(err => fetchRefreshToken(err))
    }


    return ( props.trigger) ? (
        <div className="popup">
        <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>
        <p>Posting as: {props.activeUser}</p>
            <form>
                <label>
                    Post Name:
                    <input maxLength={100} onChange={handlePostNameChange}/>
                </label>
                <br></br>
                <label>
                    Post Content:
                    <textarea cols={20} rows={5} maxLength={255} onChange={handlePostContentChange}/>
                </label>
                <br></br>
                <label>
                    Image Hyperlink:
                    <input maxLength={255} onChange={handlePostImageChange}/>
                </label>
                <br></br>
                <label>
                    <input type="checkbox" checked={isPublic} onChange={handleIsPublicChange}/>
                    Is it Public?
                </label>
                
            </form>
            
            <button className="confirm" class="button" onClick={postPost}>comment</button>
            
        </div>
    </div>

        ) : "";

}

export default PostPopup;