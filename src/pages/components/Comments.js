import axios from 'axios';
import { useEffect, useState } from 'react';
import CommentPopup from './popups/CommentPopup';
import CommentPop from './popups/CommentPopup';

function Comments({postId, activeUser}) {

  const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
          try {
          var URL = `http://localhost:9090/v1/commentsByPost/${postId}`;
    
          const response = await axios.get(URL)
    
          setComments(response.data)

          console.log(comments)
    
          } catch (err) {
            console.log(err.response.data)
          }
    
        }
        fetchItems();
      }, [])

      function renderDeleteCommentButton(comment) {
        function deleteComment() {
          axios.delete(`http://localhost:9090/v1/comment/${comment.id}`).then(
            setComments(current => 
              current.filter(comment1 => {
                return comment1.id !== comment.id
              })
              )
          )
          console.log("delete button pressed")
        }
        if(comment.username == activeUser) {
          return <text class="delete-button" onClick={() => deleteComment()}>Delete</text>
        }
      }

    return (
<div>
{comments.map((comment) => (
        <div class="comment">
          <h3>{comment.name}</h3>
          <p><span style={{fontWeight: 'bold'}}>{comment.username}</span> {comment.content}</p>
          {renderDeleteCommentButton(comment)}
          </div>
          
          
      ))}
<CommentPopup commentsMap={comments} setCommentsMap={setComments}/>
</div>
      );
}

export default Comments