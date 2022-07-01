import axios from "axios";
import React from "react";
import "./Popup.css"
import { useState } from 'react';

function CommentPopup(props) {

    const [comment, setComment] = useState("")

    function handleCommentChange(event) {
        setComment(event.target.value);
      }


    function postComment() {
        const commentToPost = {
            content: comment,
            username: props.activeUser,
            post: props.postId
        }


        console.log("comment button pressed.")

        props.setTrigger(false)
        axios.post("http://localhost:9090/v1/comment", commentToPost).then(
            props.setCommentsMap([...props.commentsMap, commentToPost])
            

        )
    }


    return ( props.trigger) ? (
         <div className="popup">
            <div className="popup-inner">
            <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>
            <p>Commenting as: {props.activeUser}</p>
            <p>PostId: {props.postId}</p>
                <form>
                    <label>
                        <input onChange={handleCommentChange}/>
                    </label>
                </form>
                <button className="confirm" class="button" onClick={postComment}>comment</button>
                
            </div>
        </div>
    ) : "";
}


export default CommentPopup;