import { useState } from "react";
import axios from "axios";
import Posts from "../Posts";


function PostPopup(props) {

    const [postContent, setPostContent] = useState("");
    const [postName, setPostName] = useState("");
    const [isPublic, setIsPublic] = useState(true)

    function handlePostContentChange(event) {
        setPostContent(event.target.value);
      }

    function handlePostNameChange(event) {
        setPostName(event.target.value);
    }

    function handleIsPublicChange(event) {
        setIsPublic(!isPublic);
    }

    function postPost() {
        const postToPost = {
            name: postName,
            content: postContent,
            isPublic: isPublic,
            username: props.activeUser
        }

        props.setTrigger(false)
        axios.post("http://localhost:9090/v1/post", postToPost).then(
             props.setPosts([...props.posts, postToPost])
        )
    }


    return ( props.trigger) ? (
        <div className="popup">
        <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>
        <p>Posting as: {props.activeUser}</p>
            <form>
                <label>
                    Post Name:
                    <input onChange={handlePostNameChange}/>
                </label>
                <br></br>
                <label>
                    Post Content:
                    <input onChange={handlePostContentChange}/>
                </label>
                <br></br>
                <label>
                    Is it Public?
                    <input type="checkbox" checked={isPublic} onChange={handleIsPublicChange}/>
                </label>
                
            </form>
            
            <button className="confirm" class="button" onClick={postPost}>comment</button>
            
        </div>
    </div>

        ) : "";

}

export default PostPopup;