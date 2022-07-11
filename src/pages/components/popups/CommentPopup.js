import axios from "axios";
import React from "react";
import "./Popup.css"
import { useState } from 'react';

function CommentPopup(props) {

    const [comment, setComment] = useState("")
    const [lengthExceeded, setLenghtExceded] = useState(false)

    function handleCommentChange(event) {
        setComment(event.target.value);
        if(event.target.value.length > 254) {
            setLenghtExceded(true)
        } 
        if(event.target.value.length <= 254) {
            setLenghtExceded(false)
        }
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
                <form>
                    <label>
                        Comment:
                        <textarea cols={20} rows={5} maxLength={255} onChange={handleCommentChange}/>
                    </label>
                </form>
                {lengthExceeded && <p style={{color : 'black'}}>Comment lenght exceeded</p>}
                <button className="confirm" class="button" onClick={postComment}>comment</button>
                
            </div>
        </div>
    ) : "";
}


export default CommentPopup;