import React, { useState, useEffect } from "react";
import Axios from "axios";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenReplyComments, setOpenReplyComments] = useState(false);
  const parentCommentId = props.parentCommentId;
  const videoId = props.videoId;

  useEffect(() => {
    let commentNumber = 0;
    props.commentLists.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
    // []안에 있는 것, props.CommentLists가 바뀔 때마다 한번 더 실행함.
  }, [props.commentLists]);

  const renderReplyComment = (parentCommentId) =>
    props.commentLists.map((comment, index) => (
      <React.Fragment>
        {comment.responseTo === parentCommentId && (
          <div stlye={{ width: "80px", marginLeft: "40px" }}>
            <SingleComment
              width={{ width: "80px", marginLeft: "40px" }}
              refreshFunction={props.refreshFunction}
              videoId={videoId}
              comment={comment}
            />
          </div>
        )}
      </React.Fragment>
    ));

  const onHandleChange = () => {
    setOpenReplyComments(!OpenReplyComments);
  };
  return (
    <div>
      {ChildCommentNumber > 0 && (
        <p style={{ fontsize: "14px", margin: 0, color: "gray" }}>
          view {ChildCommentNumber} more comment(s)
        </p>
      )}
      {OpenReplyComments && renderReplyComment(props.parentCommentId)}
      reply Comment
    </div>
  );
}

export default ReplyComment;
