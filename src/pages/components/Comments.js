import axios from "axios";
import { useEffect, useState } from "react";
import CommentPopup from "./popups/CommentPopup";

function Comments({ postId, activeUser }) {
  const [comments, setComments] = useState([]);
  const updateComments = (comment) => {
    setComments(...comments, comment);
  };
  const deleteComment = async (comment) => {
    try {
      await axios.delete(`http://localhost:9090/v1/comment/${comment.id}`);

      setComments((current) =>
        current.filter((comment1) => {
          return comment1.id !== comment.id;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        var URL = `http://localhost:9090/v1/commentsByPost/${postId}`;
        const response = await axios.get(URL);
        setComments(response.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    fetchItems();
  }, []);

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <h3> {comment.name}</h3>
          <p>
            <span style={{ fontWeight: "bold" }}>{comment.username}</span>{" "}
            {comment.content}
          </p>

          {comment.username === activeUser && (
            <button
              className="delete-button"
              onClick={() => deleteComment(comment)}
            >
              Delete
            </button>
          )}
        </div>
      ))}

      <CommentPopup updateComments={updateComments} postId={postId} />
    </div>
  );
}

export default Comments;
