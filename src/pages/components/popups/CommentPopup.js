import axios from "axios";
import React, { useRef } from "react";
import "./Popup.css";

const CommentPopup = ({ updateComments, setTrigger, ...props }) => {
  // This way you don't need to update state on each input change
  const commentInputRef = useRef(null);
  const postComment = async (comment) => {
    try {
      const commentToPost = {
        content: comment,
        username: props.activeUser,
        post: props.postId,
      };
      const response = await axios.post(
        "http://localhost:9090/v1/comment",
        commentToPost
      );

      commentToPost.id = response.data;

      updateComments(commentToPost);
      // You are trying to invoke a method that is not passed to this component
      // from the Comments.js component.
      // This will crash the component and every other prop becomes undefined. So perhaps this was the cause of your "undefined" problem.
      setTrigger && setTrigger(false);
    } catch (error) {
      console.error(error);
    }
  };
  const submitForm = (event) => {
    event.preventDefault();

    // This is your current value of the textarea input.
    // This way you avoid needless component re-rendering when updating state on each input.
    // I do not know why the comopnent loses props when re-rendering after change.
    // But this generally should solve the problem.
    postComment(commentInputRef.current.value);
  };

  // It's way cleaner to return early when using a condition when rendering rather than to use
  // shorthand conditional in this situation.
  // The previous method made the code unreadable.
  if (!props.trigger) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <button
          className="close-btn"
          onClick={() => setTrigger && setTrigger(false)}
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

        <button className="confirm" type="submit" onClick={postComment}>
          Comment
        </button>
      </div>
    </div>
  );
};

export default CommentPopup;
