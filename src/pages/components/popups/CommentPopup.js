import axios from "axios";
import React from "react";
import "./Popup.css"
import { useState } from 'react';
import Comments from "../Comments";

function CommentPopup({updateComments, ...props}) {

    const [comment, setComment] = useState("")
    

    // const handleCommentChange = (event) => {
    // updateCommentsFunction = updateComments;
    //     setComment(event.target.value);
    //   }

    console.log("Received function before Async: ", updateComments)

    const postComment = async () => {
        try {
          const commentToPost = {
            content: comment,
            username: props.activeUser,
            post: props.postId,
            id: 0
          };
          console.log('Received function before axios:', updateCommentsFunction);
          const response = await axios.post("http://localhost:9090/v1/comment", commentToPost);
    
          props.setTrigger(false);
    
          commentToPost.id = response.data;
    
          console.log('Received function after async:', updateComments);
          updateComments(commentToPost);
          
        } catch (error) {
          console.error(error);
        }
    }


    return ( props.trigger) ? (
         <div className="popup">
            <div className="popup-inner">
            <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>
                <form>
                    <label>
                        Comment:
                        <textarea cols={20} rows={5} maxLength={255} onChange={event => setComment(event.target.value)}/>
                    </label>
                </form>
                <button className="confirm" class="button" onClick={postComment}>comment</button>
                
            </div>
        </div>
    ) : "";
}


export default CommentPopup;