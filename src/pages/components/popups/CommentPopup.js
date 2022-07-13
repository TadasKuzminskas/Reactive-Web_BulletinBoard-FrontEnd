import axios from "axios";
import React from "react";
import "./Popup.css"
import { useState, useRef } from 'react';
import Comments from "../Comments";
import { fetchRefreshToken } from '../../../helpers/RefreshTokenInitializer'

function CommentPopup({updateComments, setTrigger, ...props}) {

  const commentInputRef = useRef(null);

    //const [comment, setComment] = useState("")
  

    const postComment = async (comment) => {
        try {
          const commentToPost = {
            content: commentInputRef.current.value,
            username: props.activeUser,
            post: props.postId,
            id: 0
          };

          const response = await axios.post(
            "http://localhost:9090/v1/comment",
             commentToPost
          );
    
          commentToPost.id = response.data;
          
          //This line is not working for some reason. 
          //updateComments(commentToPost);
          
          setTrigger && setTrigger(false);
        } catch (error) {
          fetchRefreshToken(error)
        }
    };

    const submitForm = (event) => {
      event.preventDefault();

      postComment(commentInputRef.current.value);
    };

    if (!props.trigger) {
      return null;
    };

    return (
         <div className="popup">
            <div className="popup-inner">
            <button className="close-btn" 
            onClick={() =>setTrigger && setTrigger(false)}
            >
              X
              </button>

                <form onSubmit={submitForm}>
                    <label>
                        Comment:
                        <textarea 
                        ref={commentInputRef}
                        cols={20} 
                        rows={5} 
                        maxLength={255} 
                        />
                    </label>
                </form>

                <button className="confirm" class="button" onClick={postComment}>
                  comment
                  </button>
            </div>
        </div>
    );
};


export default CommentPopup;