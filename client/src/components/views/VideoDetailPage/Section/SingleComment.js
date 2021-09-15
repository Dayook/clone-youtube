import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import { useSelector } from "react-redux";
import Axios from "axios";

const { TextArea } = Input;
function SingleComment(props) {
  const user = useSelector((state) => state.user);
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };

  const onHandleChange = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // 댓글 유저 , 댓글 내용 등을 모아서 request 보내줘야 함
    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      videoId: props.videoId,
      responseTo: props.comment._id,
    };
    Axios.post("/api/comments/saveComment", variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);
        setCommentValue("");
        props.refreshFunction(response.data.result);
        setOpenReply(false);
      } else {
        alert("cannot save comment");
      }
    });
  };

  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      {" "}
      Reply - to
    </span>,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author = {props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt />}
        content={<p>{props.comment.content}</p>}
      ></Comment>
      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <textarea
            onChange={onHandleChange}
            style={{ width: "100%", borderRadius: "5px" }}
            placeholder="코멘트를 작성해주세요"
          ></textarea>
          <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            {" "}
            Submit{" "}
          </button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
