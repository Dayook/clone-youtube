import React, { useState, useEffect } from "react";
import Axios from "axios";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0)
  useEffect(()=>{
    let commentNumber = 0;
    props.commentLists.map((comment) => {
      if(comment.responseTo === props.parentCommentId) {
        commentNumber ++

      }
    setChildCommentNumber(commentNumber);
    
  }, [])
  const renderReplyComment = () =>
    props.commentLists.map((comment, index) => (
      <React.Fragment>
        {comment.responseTo === parentCommentId && (
          <div>
            <SingleComment
              refreshFunction={props.refreshFunction}
              videoId = {videoId}
              comment={comment}
            />
            <ReplyComment commentLists={props.commentLists} />
          </div>
        )}
      </React.Fragment>
    ));

  return (
    <div>
      {ChildCommentNumber >0 && 
      (
      <p style={{ fontsize: "14px", margin: 0, color: "gray" }}>
        view more comment(s)
      </p>
      )}
      {renderReplyComment(props.parentCommentId)}
      reply Comment
    </div>
  );
}
export default ReplyComment;
