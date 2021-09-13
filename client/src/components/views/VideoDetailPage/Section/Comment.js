import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
function Comment(props) {
  const user = useSelector((state) => state.user);
  const videoId = props.videoId;
  const [commentValue, setCommentValue] = useState("");
  const handleClick = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const variables = {
      content: commentValue,
      writer: user.userData._id,
      videoId: videoId,
    };
    Axios.post("/api/comments/saveComment", variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);
        setCommentValue("0");
        props.refreshFunction(response.data.result);
      } else {
        alert("cannot save comment");
      }
    });
  };

  return (
    <div>
      <br />
      <p> replies </p>
      <hr />
      {/* Comment Lists */}
      {props.commentLists &&
        props.commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment>
                <SingleComment
                  refreshFunction={props.refreshFunction}
                  comment={comment}
                  videoId={props.videoId}
                />
                <ReplyComment parentCommentId={comment._id} videoId={videoId} commentLists={props.commentLists} />
              </React.Fragment>
            )
        )}
      {/* Root Comment Form */}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          placeholder="코멘트를 작성해주세요"
        ></textarea>
        <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          {" "}
          Submit{" "}
        </button>
      </form>
    </div>
  );
}

export default Comment;
