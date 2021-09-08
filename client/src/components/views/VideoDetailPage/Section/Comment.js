import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";

function Comment(props) {
  const videoId = props.videoId;
  const user = useSelector((state) => state.user);
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
